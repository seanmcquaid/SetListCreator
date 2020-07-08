const UsersModel = require("../models/UsersModel");
const SetlistsModel = require("../models/SetlistsModel");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require("bcrypt");

exports.postRegister = async (req, res, next) => {
    const {username, password, selectedBandleader} = req.body;
    const {accountType} = req.params;

    return await UsersModel.userExists(username)
        .then(async userInfo => {
            if(userInfo.length > 0){
                return await res.status(401).send({
                    errorMessage : "This user has already been registered"
                });
            }

            return await UsersModel.register(username, password, accountType, selectedBandleader)
                .then(async userInfoResponse => {

                    const specificUserInfo = userInfoResponse[0];

                    const {id, username, accounttype, setlistavailable, bandleadername} = specificUserInfo;

                    const token = jwt.sign(
                        {
                            id : id,
                            username : username,
                            accountType : accounttype
                        },
                        config.jwtSecret,
                        {expiresIn : 3600000}
                    );

                    return await res.status(200).send({
                        isAuthenticated : true,
                        token,
                        username : username,
                        accountType : accounttype,
                        setListAvailable : setlistavailable,
                        selectedBandleader : bandleadername,
                    });
                });
        })
        .catch(async err => 
            await res.status(500).send({
                errorMessage : "There was a problem registering this user, please try again"
            })
        );
};

exports.postLogin = async (req, res, next) => {
    const {username, password} = req.body;
    const {accountType} = req.params;

    return await UsersModel.userExists(username)
        .then(async userInfo => {
            if(userInfo.length == 0){
                return await res.status(401).send({
                    errorMessage : "This user isn't registered on our site!"
                });
            }

            const specificUserInfo = userInfo[0];

            const {id, username, accounttype, setlistavailable, bandleadername} = specificUserInfo;

            if(specificUserInfo.accounttype !== accountType){
                return await res.status(401).send({
                    errorMessage : "Wrong account type for this user!"
                });
            }

            return await bcrypt.compare(password, specificUserInfo.password)
                .then(async isMatch => {
                    if(!isMatch){
                        return await res.status(401).send({
                            errorMessage : "Entered password doesn't match our records"
                        });
                    }

                    const token = jwt.sign(
                        {
                            id : id,
                            username : username,
                            accountType : accounttype,
                        },
                        config.jwtSecret,
                        {expiresIn : 3600000}
                    );
    
                    return await res.status(200).send({
                        isAuthenticated : true,
                        token,
                        username : username,
                        accountType : accounttype,
                        setListAvailable : setlistavailable,
                        selectedBandleader : bandleadername,
                    });
                });
        })
        .catch(async err => 
            await res.status(500).send({
                errorMessage : "There was a problem logging in with this user, please try again"
            })
        );
};

exports.getCheckToken = async (req,res,next) => {
    const token = req.token;
    const {username} = token;

    return await UsersModel.userExists(username)
        .then(async userInfo => {
            const specificUserInfo = userInfo[0];

            const {id, accounttype, setlistavailable, bandleadername} = specificUserInfo;

            const newToken = jwt.sign(
                {
                    id : id,
                    username : specificUserInfo.username,
                    accountType : accounttype
                },
                config.jwtSecret,
                {expiresIn : 3600000}
            );

            return await res.status(200).send({
                isAuthenticated : true,
                token : newToken,
                username : username,
                accountType : accounttype,
                setListAvailable : setlistavailable,
                selectedBandleader : bandleadername,
            });
        })
        .catch(async err => {
            req.token = null;
            return await res.status(500).send({
                errorMessage : "Issue with creating a new token, please login again"
            })
        });
};

exports.getBandleaders = (req, res, next) => {
    return UsersModel.getAllBandleaders()
        .then(async response => 
            await res.status(200).send({
                bandleaders : response
            })
        )
        .catch(async err => 
            await res.status(500).send({
                errorMessage : "There was a problem getting all the bandleaders"
            })
        );
};

exports.getClientsForBandleader = async (req, res, next) => {
    const token = req.token;
    const {username} = token;

    return await UsersModel.getClientsForBandleader(username)
        .then(async clients => {
            
            const clientsWithSetlistsNotAvailable = clients.filter(client => client.setlistavailable === false);
            const clientsWithSetlistsAvailable = clients.filter(client => client.setlistavailable === true);
            const clientListWithSetlistApprovalPromises = clientsWithSetlistsAvailable.map(async client => {

                let clientInfo = {
                    username : client.username,
                    setlistavailable : client.setlistavailable,
                    id : client.id,
                    clientapproved : null,
                };
                        
                return await SetlistsModel.getSetList(clientInfo.username)
                            .then(response => {
                                if(response.length > 0){
                                    clientInfo.clientapproved = response[0].clientapproved;
                                }
                                return clientInfo;
                            });
            });

            const clientListWithSetlistApproval = Promise.all(clientListWithSetlistApprovalPromises);

            clientListWithSetlistApproval.then(async response => {
                const clientList = clientsWithSetlistsNotAvailable.concat(response);
            
                return await res.status(200).send({
                    clientList : clientList,
                });
            });
        })
        .catch(async err => 
            await res.status(500).send({
                errorMessage : "There was a problem getting all the clients for a bandleader"
            })
        );
};

exports.getUserInfo = async (req, res, next) => {
    const token = req.token;
    const {id} = token;

    return await UsersModel.getUserInfo(id)
        .then(async response => 
            await res.status(200).send({
                    isAuthenticated : true,
                    username : response[0].username,
                    accountType : response[0].accounttype
                })
        )
        .catch(async err => 
            await res.status(500).send({
                errorMessage : "There was a problem getting the user info for this user"
            })
        );
};

exports.getClientInfo = async (req, res, next) => {
    const {clientId} = req.params;

    return await UsersModel.getUserInfo(clientId)
        .then(async response => 
            await res.status(200).send({
                clientInfo : response[0],
            })
        )
        .catch(async err => 
            await res.status(500).send({
                errorMessage : "There was a problem getting the client info"
            })
        );
};

exports.editUserInfo = async (req, res, next) => {
    const {id} = req.token;
    const {newUsername, newPassword} = req.body;

    return await UsersModel.getUserInfo(id)
        .then(async response => {
            
            const userInfo = response[0];

            return await bcrypt.compare(newPassword, userInfo.password)
                .then(async isMatch => {
                    if(isMatch){
                        return await res.status(401).send({
                            errorMessage : "The new password is presently being used"
                        });
                    }

                    return await UsersModel.editUserInfo(newUsername, newPassword, id)
                                    .then(async response => {
                                        const specificUserInfo = response[0];
                                        
                                        const newToken = jwt.sign(
                                            {
                                                id : specificUserInfo.id,
                                                username : specificUserInfo.username,
                                                accountType : specificUserInfo.accounttype
                                            },
                                            config.jwtSecret,
                                            {expiresIn : 3600000}
                                        );

                                        return await res.status(200).send({
                                            isAuthenticated : true,
                                            token : newToken,
                                            username : specificUserInfo.username,
                                            accountType : specificUserInfo.accounttype
                                        });
                                    });
                });
        })
        .catch(async err => 
            await res.status(500).send({
                errorMessage : "There was a problem editing this user's info"
            })
        );
};

exports.sendClientSetList = async (req, res, next) => {
    const token = req.token;
    const {username} = token;
    const {setListAvailability} = req.body;

    return await UsersModel.setClientSetListAvailability(username, setListAvailability)
        .then(async response => 
            await res.status(200).send({
                setListAvailable : response[0].setlistavailable,
            })
        )
        .catch(async err => 
            await res.status(500).send({
                errorMessage : "There was a problem sending the Set List"
            })
        );
};

exports.deleteUser = async (req, res, next) => {
    const {username} = req.body;

    return await UsersModel.deleteUser(username)
        .then(async () => 
            await res.status(200).send({
                message : "SUCCESS",
            })
        )
        .catch(async () => 
            await res.status(500).send({
                errorMessage : "There was a problem deleting the user",
            })
        );
};