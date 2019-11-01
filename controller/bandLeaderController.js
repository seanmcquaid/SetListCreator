const UserModel = require("../models/UserModel");
const BandLeaderSongListModel = require("../models/BandLeaderSongListModel");

exports.postAddSong = (req,res,next) => {
    const {songName, artistName, songKey} = req.body;
    const token = req.token;
    const {username} = token;

    BandLeaderSongListModel.addSong(songName, artistName, songKey, username)
                            .then(response => {
                                console.log(response)
                            })
                            .catch(err => {
                                console.log(err)
                            })
};