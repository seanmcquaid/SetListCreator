const ClientSongListModel = require("../models/ClientSongListModel");
const UserModel = require("../models/UserModel");
const SetlistsModel = require("../models/SetlistsModel");

exports.postAddSong = (req, res, next) => {
    const {songName, artistName} = req.body;
    const {songType} = req.params;
    const token = req.token;
    const {username, id} = token;
    
    ClientSongListModel.addSong(songName, artistName, songType, username)
                        .then(addedSong => {
                            UserModel.getUserInfo(id)
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
                                                        });
                            })
                        })
                        .catch(err => {
                            console.log(err);
                        });


};

exports.deleteSong = (req, res, next) => {
    const {songId} = req.params;
    const token = req.token;
    const {username, id} = token;

    ClientSongListModel.deleteSong(username, songId)
                        .then(deletedSong => {
                            UserModel.getUserInfo(id)
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
                                                        });
                            })
                        })
                        .catch(err => {
                            console.log(err);
                        });

};

exports.getSongs = (req, res, next) => {
    const token = req.token;
    const {username, id} = token;

    ClientSongListModel.getSongs(username)
                        .then(clientSongs => {
                            UserModel.getUserInfo(id)
                                    .then(userInfo => {
                                        const {requestedSongsList, doNotPlaySongsList} = clientSongs;
                                        return res.status(200).send({
                                            requestedSongsList, 
                                            doNotPlaySongsList,
                                            setListAvailable : userInfo[0].setlistavailable,
                                        });
                                    })
                        })
                        .catch(err => {
                            console.log(err);
                        });

}

exports.getSong = (req, res, next) => {
    const token = req.token;
    const {username} = token;
    const {songId} = req.params;
    
    ClientSongListModel.getSong(username, songId)
                        .then(response => {
                            return res.status(200).send({
                                songInfo : response
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        })

};

exports.editSong = (req, res, next) => {
    const {songId} = req.params;
    const token = req.token;
    const {username, id} = token;
    const {songName, artistName, playListType} = req.body;

    ClientSongListModel.editSong(songId, songName, artistName, playListType, username)
                    .then(editedSong => {
                        UserModel.getUserInfo(id)
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
                                                    });
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    });

};

exports.getCompletedSetlist = (req, res, next) => {
    const token = req.token;
    const {username} = token;

    SetlistsModel.getSetlist(username)
            .then(response => {
                const {clientname, bandleadername, setlist, bandleadercomments} = response[0];
                return res.status(200).send({
                    clientName : clientname,
                    bandLeaderName : bandleadername,
                    suggestedSetList : setlist.map(song => JSON.parse(song)),
                    bandLeaderComments : bandleadercomments
                });
            })
            .catch(err => console.log(err));
};

exports.editCompletedSetlistComments = (req, res, next) => {
    const {clientComments} = req.body;
    const token = req.token;
    const {username} = token;

    SetlistsModel.addClientComments(username, clientComments)
            .then(response => {
                return res.status(200).send({
                    setListInfo : response[0],
                })
            })
            .catch(err => console.log(err));
};