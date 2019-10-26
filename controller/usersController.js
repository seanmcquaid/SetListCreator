const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require("bcrypt");

exports.postRegister = (req, res, next) => {
    const {username, password, duplicatePassword} = req.body;
    const {accountType} = req.params;
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

                return UserModel.register(username, password, accountType)
                        .then(userInfoResponse => {
                            const specificUserInfo = userInfoResponse[0];
                            const token = jwt.sign(
                                {id : specificUserInfo.id},
                                config.jwtSecret,
                                {expiresIn : 36000}
                            );
                            return res.status(200).json({
                                isAuthenticated : true,
                                token,
                                username : specificUserInfo.username,
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

                const specificUserInfo = userInfo[0]

                return bcrypt.compare(password, specificUserInfo.password)
                            .then(isMatch => {
                                if(!isMatch){
                                    return res.status(401).send({
                                        errorMessage : "Entered password doesn't match our records"
                                    });
                                }

                                const token = jwt.sign(
                                    {id : specificUserInfo.id},
                                    config.jwtSecret,
                                    {expiresIn : 36000}
                                );
                
                                return res.status(200).json({
                                    isAuthenticated : true,
                                    token,
                                    username : specificUserInfo.username
                                });


                            });

                
            })
            .catch(err => console.log(err))
};