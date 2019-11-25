const ClientSongListModel = require("../models/ClientSongListModel");

exports.postAddSong = (req, res, next) => {
    const {songName, artistName} = req.body;
    const {songType} = req.params;
    const token = req.token;
    const {username} = token;
    
    ClientSongListModel.addSong(songName, artistName, songType, username)
                        .then(response => {
                            return res.status(200).send({
                                clientSongs : response
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        })


};

exports.deleteSong = (req, res, next) => {
    const {songId} = req.params;
    const token = req.token;
    const {username} = token;

    ClientSongListModel.deleteSong(username, songId)
                        .then(response => {
                            return res.status(200).send({
                                clientSongs : response
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        });

};

exports.getSongs = (req, res, next) => {
    const token = req.token;
    const {username} = token;

    ClientSongListModel.getSongs(username)
                        .then(response => {
                            return res.status(200).send({
                                clientSongs : response
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        });

}