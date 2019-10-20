const UserModel = require("../models/UserModel");

exports.postRegister = (req, res, next) => {
    console.log("received")
    const {username, password, duplicatePassword, accountType} = req.body;
    UserModel.userExists(username)
            .then(response => {
                console.log(response);
            })
            .catch(err => console.log(err));

    res.json({
        errorMessage : "NO"
    })
};

exports.postLogin = (req, res, next) => {
    const {username, password} = req.body;

};