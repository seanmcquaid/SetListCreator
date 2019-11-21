const UserModel = require("../models/UserModel");

exports.postAddSong = (req, res, next) => {
    console.log(req.body);
    console.log(req.params);
};