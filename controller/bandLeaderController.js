const UsersModel = require("../models/UsersModel");
const ClientSongListModel = require("../models/ClientSongListModel");
const BandleaderSongListModel = require("../models/BandleaderSongListModel");
const SetListsModel = require("../models/SetListsModel");

exports.postAddSong = (req, res, next) => {
    const {songName, artistName, songKey} = req.body;
    const token = req.token;
    const {username} = token;

    BandleaderSongListModel.addSong(songName, artistName, songKey, username)
        .then(response => 
            res.status(200).send({
                songList : response
            })
        )
        .catch(err => 
            res.status(500).send({
                errorMessage : "There was a problem adding that song"
            })
        );
};

exports.getSongs = (req, res, next) => {
    const token = req.token;
    const {username} = token;

    BandleaderSongListModel.getSongs(username)
        .then(response => 
            res.status(200).send({
                songList : response
            })
        )
        .catch(err => 
            res.status(500).send({
                errorMessage : "There was a problem getting all the songs"
            })
        );
}

exports.getSong = (req, res, next) => {
    const token = req.token;
    const {username} = token;
    const {songId} = req.params;
    
    BandleaderSongListModel.getSong(username, songId)
        .then(response => 
            res.status(200).send({
                songInfo : response
            })
        )
        .catch(err => 
            res.status(500).send({
                errorMessage : "There was a problem getting the song information"
            })
        );
}

exports.deleteSong = (req, res, next) => {
    const {songId} = req.params;
    const token = req.token;
    const {username} = token;

    BandleaderSongListModel.deleteSong(username, songId)
        .then(response => 
            res.status(200).send({
                songList : response
            })
        )
        .catch(err => 
            res.status(500).send({
                errorMessage : "There was a problem deleting the song"
            })
        );
};

exports.editSong = (req, res, next) => {
    const {songId} = req.params;
    const token = req.token;
    const {username} = token;
    const {songName, artistName, songKey} = req.body;

    BandleaderSongListModel.editSong(songId, songName, artistName, songKey, username)
        .then(response => 
            res.status(200).send({
                songList : response
            })
        )
        .catch(err => 
            res.status(500).send({
                errorMessage : "There was a problem editing the song"
            })
        );

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

                });
        })
        .catch(err => 
            res.status(500).send({
                errorMessage : "There was a problem getting all of the client songs"
            })
        );

};

exports.getSuggestedSetList = (req, res, next) => {
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

                            SetListsModel.getSetList(userInfo.username)
                                .then(setListInfo => 
                                    res.status(200).send({
                                        suggestedSetList,
                                        additionalClientRequests,
                                    }));
                        });
                });
        })
        .catch(err => 
            res.status(500).send({
                errorMessage : "There was a problem getting the suggested setlist"
            })
        );

};

exports.postCompletedSetList = (req, res, next) => {
    const {completedSetList, clientId, bandleaderComments} = req.body;
    const token = req.token;
    const bandleaderName = token.username;

    UsersModel.getUserInfo(clientId)
            .then(async clientInfo => {

                const clientName = clientInfo[0].username;

                await SetListsModel.addSetList(clientName, bandleaderName, completedSetList, bandleaderComments)
                        .then(setListInfo => {

                            const {clientname, bandleadername, setlist, bandleadercomments} = setListInfo[0];

                            return res.status(200).send({
                                clientName : clientname,
                                bandleaderName : bandleadername,
                                suggestedSetList : setlist.map(song => JSON.parse(song)),
                                bandleaderComments : bandleadercomments
                            });

                        });
            })
            .catch(err => 
                res.status(500).send({
                    errorMessage : "There was a problem adding the completed setlist"
                })
            );
};

exports.getClientSetListInfo = (req, res, next) => {
    const {clientId} = req.params;
    const token = req.token;
    const {username} = token;

    UsersModel.getUserInfo(clientId)
            .then(userInfo => {

                const clientInfo = userInfo[0];

                SetListsModel.getSetList(clientInfo.username)
                    .then(setListInfo => {

                        const {clientname, bandleadername, setlist, bandleadercomments} = setListInfo[0];

                        return res.status(200).send({
                            clientName : clientname,
                            bandleaderName : bandleadername,
                            suggestedSetList : setlist.map(song => JSON.parse(song)),
                            bandleaderComments : bandleadercomments
                        });

                    });
            })
            .catch(err => 
                res.status(500).send({
                    errorMessage : "There was a problem getting the client Set List information"
                })
            );
};

exports.editCompletedSetList = (req, res, next) => {
    const {completedSetList, clientId, bandleaderComments} = req.body;
    const token = req.token;
    const bandleaderName = token.username;

    UsersModel.getUserInfo(clientId)
            .then(async clientInfo => {

                const clientName = clientInfo[0].username;

                await SetListsModel.editSetList(clientName, bandleaderName, completedSetList, bandleaderComments)
                        .then(setListInfo => {

                            const {clientname, bandleadername, setlist, bandleadercomments} = setListInfo[0];

                            return res.status(200).send({
                                clientName : clientname,
                                bandleaderName : bandleadername,
                                suggestedSetList : setlist.map(song => JSON.parse(song)),
                                bandleaderComments : bandleadercomments
                            });

                        });
            })
            .catch(err => 
                res.status(500).send({
                    errorMessage : "There was a problem editing the Set List information"
                })
            );
};