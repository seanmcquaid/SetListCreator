const ClientSongListModel = require("../models/ClientSongListModel");

exports.postAddSong = (req, res, next) => {
    const {songName, artistName} = req.body;
    const {songType} = req.params;
    const token = req.token;
    const {username} = token;
    
    ClientSongListModel.addSong(songName, artistName, songType, username)
                        .then(response => {
                            return res.status(200).send({
                                requestedSongsList : response
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        })


};