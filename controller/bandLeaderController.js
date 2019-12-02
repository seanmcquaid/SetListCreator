const UserModel = require("../models/UserModel");
const BandLeaderSongListModel = require("../models/BandLeaderSongListModel");

exports.postAddSong = (req, res, next) => {
    const {songName, artistName, songKey} = req.body;
    const token = req.token;
    const {username} = token;

    BandLeaderSongListModel.addSong(songName, artistName, songKey, username)
                            .then(response => {
                                return res.status(200).send({
                                    songList : response
                                });
                            })
                            .catch(err => {
                                console.log(err)
                            })
};

exports.getSongs = (req, res, next) => {
    const token = req.token;
    const {username} = token;

    BandLeaderSongListModel.getSongs(username)
                            .then(response =>{
                                return res.status(200).send({
                                    songList : response
                                })
                            })
                            .catch(err => {
                                console.log(err);
                            })
}

exports.getSong = (req, res, next) => {
    const token = req.token;
    const {username} = token;
    const {songId} = req.params;
    
    BandLeaderSongListModel.getSong(username, songId)
                        .then(response => {
                            return res.status(200).send({
                                songList : response
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        })
}

exports.deleteSong = (req, res, next) => {
    const {songId} = req.params;
    const token = req.token;
    const {username} = token;

    BandLeaderSongListModel.deleteSong(username, songId)
                        .then(response => {
                            return res.status(200).send({
                                songList : response
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        });
};

exports.editSong = (req, res, next) => {
    const token = req.token;
    const {username} = token;
};