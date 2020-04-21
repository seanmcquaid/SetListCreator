const UserModel = require("../models/UserModel");
const ClientSongListModel = require("../models/ClientSongListModel");
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
                                songInfo : response
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
                            console.log(response)
                            return res.status(200).send({
                                songList : response
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        });
};

exports.editSong = (req, res, next) => {
    const {songId} = req.params;
    const token = req.token;
    const {username} = token;
    const {songName, artistName, songKey} = req.body;

    BandLeaderSongListModel.editSong(songId, songName, artistName, songKey, username)
                            .then(response => {
                                console.log(response);
                                return res.status(200).send({
                                    songList : response
                                });
                            })
                            .catch(err => {
                                console.log(err);
                            })

};

exports.getClientSongs = (req, res, next) => {
    const {clientId} = req.params;

    UserModel.getUserInfo(clientId)
            .then(clientInfo => {
                const userInfo = clientInfo[0];
                ClientSongListModel.getSongs(userInfo.username)
                                    .then(clientSongs => {
                                        const {requestedSongsList, doNotPlaySongsList} = clientSongs;
                                        return res.status(200).send({
                                            userInfo,
                                            requestedSongsList, 
                                            doNotPlaySongsList
                                        });
                                    })
            })
            .catch(err => console.log(err));

};

exports.getSuggestedSetlist = (req, res, next) => {
    const {clientId} = req.params;
    const token = req.token;
    const {username} = token;

    UserModel.getUserInfo(clientId)
            .then(clientInfo => {
                const userInfo = clientInfo[0];
                ClientSongListModel.getSongs(userInfo.username)
                    .then(clientSongs => {
                        const {requestedSongsList, doNotPlaySongsList} = clientSongs;
                        BandLeaderSongListModel.getSongs(username)
                            .then(bandLeaderSongs => {
                                // compare bandLeaderSongs and clientSongs
                                // return suggestedSetlist and additional Song Choices

                                const filteredBandLeaderSongList = bandLeaderSongs.filter(bandLeaderSong => {
                                    const isBandLeaderSongInClientDoNotPlayList = doNotPlaySongsList.find(doNotPlaySong => doNotPlaySong.songname === bandLeaderSong.songname);
                                    return isBandLeaderSongInClientDoNotPlayList ? null : bandLeaderSong;
                                });


                                const suggestedSetlist = [...filteredBandLeaderSongList];

                                // figure out how many songs to add

                                // iterate through the rest of the client songs and add until you get 30 songs
                                // throw the rest in the additional songs list

                                return res.status(200).send({
                                    suggestedSetlist : [],
                                    additionalSongChoices : [],
                                });
                            })
                    })
            })
            .catch(err => console.log(err));

};