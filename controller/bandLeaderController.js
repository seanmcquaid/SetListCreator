const UsersModel = require("../models/UsersModel");
const ClientSongListModel = require("../models/ClientSongListModel");
const BandleaderSongListModel = require("../models/BandleaderSongListModel");
const SetListsModel = require("../models/SetListsModel");

exports.postAddSong = (req, res, next) => {
    const {songName, artistName, songKey} = req.body;
    const token = req.token;
    const {username} = token;

    BandleaderSongListModel.addSong(songName, artistName, songKey, username)
                            .then(response => {
                                return res.status(200).send({
                                    songList : response
                                });
                            })
                            .catch(err => res.sendStatus(404));
};

exports.getSongs = (req, res, next) => {
    const token = req.token;
    const {username} = token;

    BandleaderSongListModel.getSongs(username)
                            .then(response =>{
                                return res.status(200).send({
                                    songList : response
                                })
                            })
                            .catch(err => res.sendStatus(404));
}

exports.getSong = (req, res, next) => {
    const token = req.token;
    const {username} = token;
    const {songId} = req.params;
    
    BandleaderSongListModel.getSong(username, songId)
                        .then(response => {
                            return res.status(200).send({
                                songInfo : response
                            });
                        })
                        .catch(err => res.sendStatus(404))
}

exports.deleteSong = (req, res, next) => {
    const {songId} = req.params;
    const token = req.token;
    const {username} = token;

    BandleaderSongListModel.deleteSong(username, songId)
                        .then(response => {
                            console.log(response)
                            return res.status(200).send({
                                songList : response
                            });
                        })
                        .catch(err => res.sendStatus(404));
};

exports.editSong = (req, res, next) => {
    const {songId} = req.params;
    const token = req.token;
    const {username} = token;
    const {songName, artistName, songKey} = req.body;

    BandleaderSongListModel.editSong(songId, songName, artistName, songKey, username)
                            .then(response => {
                                return res.status(200).send({
                                    songList : response
                                });
                            })
                            .catch(err => res.sendStatus(404));

};

exports.getClientSongs = (req, res, next) => {
    const {clientId} = req.params;

    UsersModel.getUserInfo(clientId)
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
            .catch(err => res.sendStatus(404));

};

exports.getSuggestedSetlist = (req, res, next) => {
    const {clientId} = req.params;
    const token = req.token;
    const {username} = token;

    UsersModel.getUserInfo(clientId)
            .then(clientInfo => {
                const userInfo = clientInfo[0];
                ClientSongListModel.getSongs(userInfo.username)
                    .then(clientSongs => {
                        const {requestedSongsList, doNotPlaySongsList} = clientSongs;
                        BandleaderSongListModel.getSongs(username)
                            .then(bandleaderSongs => {

                                const suggestedSetList = bandleaderSongs.filter(bandleaderSong => {
                                    const isBandleaderSongInClientDoNotPlayList = doNotPlaySongsList.find(doNotPlaySong => doNotPlaySong.songname === bandleaderSong.songname);
                                    return isBandleaderSongInClientDoNotPlayList ? null : bandleaderSong;
                                });

                                const additionalClientRequests = requestedSongsList.filter(requestedSong => {
                                    const isRequestedSongInSuggestedSetlist = suggestedSetList.find(suggestedSong => suggestedSong.songname === requestedSong.songname);
                                    return isRequestedSongInSuggestedSetlist ? null : requestedSong;
                                });

                                return res.status(200).send({
                                    suggestedSetList,
                                    additionalClientRequests,
                                });
                            })
                    })
            })
            .catch(err => res.sendStatus(404));

};

exports.postCompletedSetlist = (req, res, next) => {
    const {completedSetList, clientId, bandLeaderComments} = req.body;
    const token = req.token;
    const bandLeaderName = token.username;

    UsersModel.getUserInfo(clientId)
            .then(async clientInfo => {
                const clientName = clientInfo[0].username;
                await SetListsModel.addSetlist(clientName, bandLeaderName, completedSetList, bandLeaderComments)
                        .then(setListInfo => {
                            const {clientname, bandleadername, setlist, bandleadercomments} = setListInfo[0];
                            return res.status(200).send({
                                clientName : clientname,
                                bandLeaderName : bandleadername,
                                suggestedSetList : setlist.map(song => JSON.parse(song)),
                                bandLeaderComments : bandleadercomments
                            });
                        });
            })
            .catch(err => res.sendStatus(404));
};

exports.getClientSetlistInfo = (req, res, next) => {
    const {clientId} = req.params;
    const token = req.token;
    const {username} = token;

    UsersModel.getUserInfo(clientId)
            .then(userInfo => {
                const clientInfo = userInfo[0];
                SetListsModel.getSetlist(clientInfo.username)
                            .then(setListInfo => {
                                const {clientname, bandleadername, setlist, bandleadercomments} = setListInfo[0];
                                return res.status(200).send({
                                    clientName : clientname,
                                    bandLeaderName : bandleadername,
                                    suggestedSetList : setlist.map(song => JSON.parse(song)),
                                    bandLeaderComments : bandleadercomments
                                });
                            })

            })
            .catch(err => res.sendStatus(404));
};

exports.editCompletedSetlist = (req, res, next) => {

};