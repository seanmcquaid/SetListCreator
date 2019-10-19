const UserModel = require("../models/UserModel");

exports.postRegister = (req, res, next) => {
    const {username, password, duplicatePassword, accountType} = req.body;
    
};

exports.postLogin = (req, res, next) => {
    const {username, password} = req.body;
};