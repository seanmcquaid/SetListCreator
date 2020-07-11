const UsersModel = require("../models/UsersModel");
const ClientSongListModel = require("../models/ClientSongListModel");
const BandleaderSongListModel = require("../models/BandleaderSongListModel");
const SetListsModel = require("../models/SetListsModel");

exports.postAddSong = async (req, res, next) => {
    const {songName, artistName, songKey} = req.body;
    const token = req.token;
    const {username} = token;

    return await BandleaderSongListModel.addSong(songName, artistName, songKey, username)
        .then(async response => 
            await res.status(200).send({
                songList : response
            })
        )
        .catch(async err => 
            await res.status(500).send({
                errorMessage : "There was a problem adding that song"
            })
        );
};

exports.getSongs = async (req, res, next) => {
    const token = req.token;
    const {username} = token;

    return await BandleaderSongListModel.getSongs(username)
        .then(async response => 
            await res.status(200).send({
                songList : response
            })
        )
        .catch(async err => 
            await res.status(500).send({
                errorMessage : "There was a problem getting all the songs"
            })
        );
}

exports.getSong = async (req, res, next) => {
    const token = req.token;
    const {username} = token;
    const {songId} = req.params;
    
    return await BandleaderSongListModel.getSong(username, songId)
        .then(async response => 
            await res.status(200).send({
                songInfo : response[0]
            })
        )
        .catch(async err => 
            await res.status(500).send({
                errorMessage : "There was a problem getting the song information"
            })
        );
}

exports.deleteSong = async (req, res, next) => {
    const {songId} = req.params;
    const token = req.token;
    const {username} = token;

    return await BandleaderSongListModel.deleteSong(username, songId)
        .then(async response => 
            await res.status(200).send({
                songList : response
            })
        )
        .catch(async err => 
            await res.status(500).send({
                errorMessage : "There was a problem deleting the song"
            })
        );
};

exports.editSong = async (req, res, next) => {
    const {songId} = req.params;
    const token = req.token;
    const {username} = token;
    const {songName, artistName, songKey} = req.body;

    return await BandleaderSongListModel.editSong(songId, songName, artistName, songKey, username)
        .then(async response => 
            await res.status(200).send({
                songList : response
            })
        )
        .catch(async err => 
            await res.status(500).send({
                errorMessage : "There was a problem editing the song"
            })
        );
};

exports.getClientSongs = async (req, res, next) => {
    const {clientId} = req.params;

    return await UsersModel.getUserInfo(clientId)
        .then(async clientInfo => {

            const userInfo = clientInfo[0];

            return await ClientSongListModel.getSongs(userInfo.username)
                .then(async clientSongs => {

                    const {requestedSongsList, doNotPlaySongsList} = clientSongs;
                    const {id, username, accounttype, bandleadername, setlistavailable} = userInfo;

                    return await res.status(200).send({
                        userInfo : {
                            id,
                            username,
                            accountType : accounttype,
                            bandleaderName : bandleadername,
                            setListAvailable : setlistavailable,
                        },
                        requestedSongsList, 
                        doNotPlaySongsList
                    });

                });
        })
        .catch(async err => 
            await res.status(500).send({
                errorMessage : "There was a problem getting all of the client songs"
            })
        );

};

exports.getSuggestedSetList = async (req, res, next) => {
    const {clientId} = req.params;
    const token = req.token;
    const {username} = token;

    return await UsersModel.getUserInfo(clientId)
        .then(async clientInfo => {

            const userInfo = clientInfo[0];

            return await ClientSongListModel.getSongs(userInfo.username)
                .then(async clientSongs => {

                    const {requestedSongsList, doNotPlaySongsList} = clientSongs;

                    return await BandleaderSongListModel.getSongs(username)
                        .then(async bandleaderSongs => {

                            const suggestedSetList = bandleaderSongs.filter(bandleaderSong => {
                                const isBandleaderSongInClientDoNotPlayList = doNotPlaySongsList.find(doNotPlaySong => doNotPlaySong.songname === bandleaderSong.songname);
                                return isBandleaderSongInClientDoNotPlayList ? null : bandleaderSong;
                            });

                            const additionalClientRequests = requestedSongsList.filter(requestedSong => {
                                const isRequestedSongInSuggestedSetlist = suggestedSetList.find(suggestedSong => suggestedSong.songname === requestedSong.songname);
                                return isRequestedSongInSuggestedSetlist ? null : requestedSong;
                            });

                            return await SetListsModel.getSetList(userInfo.username)
                                .then(async setListInfo => 
                                    await res.status(200).send({
                                        suggestedSetList,
                                        additionalClientRequests,
                                        clientComments : setListInfo.length > 0 && setListInfo.clientcomments ? setListInfo.clientcomments : []
                                    }));
                        });
                });
        })
        .catch(async err => 
            await res.status(500).send({
                errorMessage : "There was a problem getting the suggested setlist"
            })
        );

};

exports.postCompletedSetList = async (req, res, next) => {
    const {completedSetList, clientId, bandleaderComments} = req.body;
    const token = req.token;
    const bandleaderName = token.username;

    return await UsersModel.getUserInfo(clientId)
            .then(async clientInfo => {

                const clientName = clientInfo[0].username;
                
                return await SetListsModel.addSetList(clientName, bandleaderName, completedSetList, bandleaderComments)
                    .then(async setListInfo => {

                        const {clientname, bandleadername, setlist, bandleadercomments} = setListInfo[0];
                        
                        return await res.status(200).send({
                            clientName : clientname,
                            bandleaderName : bandleadername,
                            suggestedSetList : setlist.map(song => JSON.parse(song)),
                            bandleaderComments : bandleadercomments
                        });

                    });
            })
            .catch(async err => 
                await res.status(500).send({
                    errorMessage : "There was a problem adding the completed setlist"
                })
            );
};

exports.getClientSetListInfo = async (req, res, next) => {
    const {clientId} = req.params;

    return await UsersModel.getUserInfo(clientId)
        .then(async userInfo => {

            const clientInfo = userInfo[0];

            return await SetListsModel.getSetList(clientInfo.username)
                .then(async setListInfo => {

                    const {clientname, bandleadername, setlist, bandleadercomments} = setListInfo[0];

                    return await res.status(200).send({
                        clientName : clientname,
                        bandleaderName : bandleadername,
                        suggestedSetList : setlist.map(song => JSON.parse(song)),
                        bandleaderComments : bandleadercomments
                    });

                });
        })
        .catch(async err => 
            await res.status(500).send({
                errorMessage : "There was a problem getting the client Set List information"
            })
        );
};

exports.editCompletedSetList = async (req, res, next) => {
    const {completedSetList, clientId, bandleaderComments} = req.body;
    const token = req.token;
    const bandleaderName = token.username;

    return await UsersModel.getUserInfo(clientId)
        .then(async clientInfo => {

            const clientName = clientInfo[0].username;

            return await SetListsModel.editSetList(clientName, bandleaderName, completedSetList, bandleaderComments)
                .then(async setListInfo => {

                    const {clientname, bandleadername, setlist, bandleadercomments} = setListInfo[0];

                    return await res.status(200).send({
                        clientName : clientname,
                        bandleaderName : bandleadername,
                        suggestedSetList : setlist.map(song => JSON.parse(song)),
                        bandleaderComments : bandleadercomments
                    });

                });
        })
        .catch(async err => 
            await res.status(500).send({
                errorMessage : "There was a problem editing the Set List information"
            })
        );
};

// PURELY for testing clean up

exports.deleteAllSongsAndSetList = async (req, res, next) => {
    const {bandleaderName, clientName} = req.body;

    try {
        await BandleaderSongListModel.deleteAllSongs(bandleaderName);
        await SetListsModel.deleteSetList(clientName, bandleaderName);
        return res.status(200).send({
            message : "SUCCESS",
        });
    } catch (error) {
        return res.status(500).send({
            errorMessage : "There was a problem deleting all songs and set lists for a bandleader"
        })
    }
};