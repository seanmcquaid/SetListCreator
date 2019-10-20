const UserModel = require("../models/UserModel");

exports.postRegister = (req, res, next) => {
    console.log("received")
    const {username, password, duplicatePassword, accountType} = req.body;
    UserModel.userExists(username)
            .then(userInfo => {
                if(userInfo.length > 0){
                    return
                }
                UserModel.register(username, password, duplicatePassword, accountType)
                        .then(userInfo => {
                            console.log(userInfo)
                        })
            })
            .catch(err => console.log(err));
};

exports.postLogin = (req, res, next) => {
    const {username, password} = req.body;

};