const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require("bcrypt");

exports.postRegister = (req, res, next) => {
    const {username, password, duplicatePassword} = req.body;
    const {accountType} = req.params;

    // add logic here for the band leader set up???? - create drop down of band leader options for client 

    UserModel.userExists(username)
            .then(userInfo => {
                if(userInfo.length > 0){
                    return res.status(401).send({
                        errorMessage : "This user has already been registered"
                    });
                }

                if(password !== duplicatePassword){
                    return res.status(401).send({
                        errorMessage : "Passwords don't match"
                    });
                }

                // remove this top part and move that to the front end

                return UserModel.register(username, password, accountType)
                        .then(userInfoResponse => {
                            const specificUserInfo = userInfoResponse[0];
                            const token = jwt.sign(
                                {
                                    id : specificUserInfo.id,
                                    username : specificUserInfo.username,
                                    accountType : specificUserInfo.accounttype
                                },
                                config.jwtSecret,
                                {expiresIn : 3600000}
                            );
                            return res.status(200).json({
                                isAuthenticated : true,
                                token,
                                username : specificUserInfo.username,
                                accountType : specificUserInfo.accounttype
                            });
                        })
            })
            .catch(err => console.log(err));
};

exports.postLogin = (req, res, next) => {
    const {username, password} = req.body;
    UserModel.userExists(username)
            .then(userInfo => {
                if(userInfo.length == 0){
                    return res.status(401).send({
                        errorMessage : "This user isn't registered on our site!"
                    });
                }

                const specificUserInfo = userInfo[0];

                return bcrypt.compare(password, specificUserInfo.password)
                            .then(isMatch => {
                                if(!isMatch){
                                    return res.status(401).send({
                                        errorMessage : "Entered password doesn't match our records"
                                    });
                                }

                                const token = jwt.sign(
                                    {
                                        id : specificUserInfo.id,
                                        username : specificUserInfo.username,
                                        accountType : specificUserInfo.accounttype
                                    },
                                    config.jwtSecret,
                                    {expiresIn : 3600000}
                                );
                
                                return res.status(200).json({
                                    isAuthenticated : true,
                                    token,
                                    username : specificUserInfo.username,
                                    accountType : specificUserInfo.accounttype
                                });


                            });

                
            })
            .catch(err => console.log(err))
};

exports.getCheckToken = (req,res,next) => {
    const token = req.token;
    const {username} = token;

    return UserModel.userExists(username)
            .then(userInfo => {
                const specificUserInfo = userInfo[0];
                const newToken = jwt.sign(
                    {
                        id : specificUserInfo.id,
                        username : specificUserInfo.username,
                        accountType : specificUserInfo.accounttype
                    },
                    config.jwtSecret,
                    {expiresIn : 3600000}
                );

                return res.status(200).json({
                    isAuthenticated : true,
                    token : newToken,
                    username : specificUserInfo.username,
                    accountType : specificUserInfo.accounttype
                });
            })
            .catch(err => {
                req.token = null;
                return res.status(401).send({
                    errorMessage : "Issue with creating a new token, please login again"
                })
            });


};

exports.getBandleaders = (req, res, next) => {
    return UserModel.getAllBandleaders()
                .then(response => {
                    return res.status(200).json({
                        bandLeaders : response
                    })
                })
                .catch(err => console.log(err));
};

exports.getClientsForBandLeader = (req, res, next) => {

};

exports.getUserInfo = (req, res, next) => {
    const token = req.token;
    const {id} = token;

    return UserModel.getUserInfo(id)
                    .then(response => {
                        return res.status(200).json({
                            userInfo : response
                        })
                    })
                    .catch(err => console.log(err));
};

exports.editUserInfo = (req, res, next) => {
    // if passwords match when submitted, then continue
    // COMPARE CURRENT PASSWORD VS OLD
    // remember to return NEW TOKEN
    const {id, username} = req.token;
    const {newUsername, newPassword} = req.body;

    UserModel.getUserInfo(id)
            .then(async response => {
                const userInfo = response[0];
                bcrypt.compare(newPassword, userInfo.password)
                    .then(isMatch => {
                        if(isMatch){
                            return res.status(401).send({
                                errorMessage : "The new password is presently being used"
                            })
                        }

                        if(newUsername === userInfo.username){
                            return res.status(401).send({
                                errorMessage : "The new username is presently being used"
                            })
                        }

                    })

                // username and password are not the same, can update now

                UserModel.editUserInfo(newUsername, newPassword, id)
                        .then(response => {
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

                            return res.status(200).json({
                                isAuthenticated : true,
                                token : newToken,
                                username : specificUserInfo.username,
                                accountType : specificUserInfo.accounttype
                            });
                        })

            })
            .catch(err => console.log(err));

};