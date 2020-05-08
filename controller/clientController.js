const ClientSongListModel = require("../models/ClientSongListModel");
const UsersModel = require("../models/UsersModel");
const SetListsModel = require("../models/SetListsModel");

exports.postAddSong = async (req, res, next) => {
    const {songName, artistName} = req.body;
    const {songType} = req.params;
    const token = req.token;
    const {username, id} = token;
    
    return await ClientSongListModel.addSong(songName, artistName, songType, username)
        .then(async addedSong => {

            return await UsersModel.getUserInfo(id)
                .then(async clientInfo => {

                    const userInfo = clientInfo[0];

                    return await ClientSongListModel.getSongs(userInfo.username)
                        .then(async clientSongs => {

                            const {requestedSongsList, doNotPlaySongsList} = clientSongs;

                            return await SetListsModel.getSetList(userInfo.username)
                                .then(async setListInfo => 
                                    await res.status(200).send({
                                        requestedSongsList, 
                                        doNotPlaySongsList,
                                        setListAvailable : userInfo.setlistavailable,
                                        clientApproved : setListInfo.length > 0 ? setListInfo[0].clientapproved : false,
                                    }));
                        });
            });
        })
        .catch(async err => 
            await res.status(500).send({
                errorMessage : "There was a problem adding the song"
            })
        );
};

exports.deleteSong = async (req, res, next) => {
    const {songId} = req.params;
    const token = req.token;
    const {username, id} = token;

    return await ClientSongListModel.deleteSong(username, songId)
        .then(async deletedSong => {

            return await UsersModel.getUserInfo(id)
                .then(async clientInfo => {

                    const userInfo = clientInfo[0];

                    return await ClientSongListModel.getSongs(userInfo.username)
                        .then(async clientSongs => {

                            const {requestedSongsList, doNotPlaySongsList} = clientSongs;

                            return await SetListsModel.getSetList(userInfo.username)
                                .then(async setListInfo => 
                                    await res.status(200).send({
                                        requestedSongsList, 
                                        doNotPlaySongsList,
                                        setListAvailable : userInfo.setlistavailable,
                                        clientApproved : setListInfo.length > 0 ? setListInfo[0].clientapproved : false
                                    }));
                        });
            });
        })
        .catch(async err => 
            await res.status(500).send({
                errorMessage : "There was a problem deleting the song"
            })
        );

};

exports.getSongs = async (req, res, next) => {
    const token = req.token;
    const {username, id} = token;

    return await ClientSongListModel.getSongs(username)
        .then(async clientSongs => {

            return await UsersModel.getUserInfo(id)
                .then(async userInfo => {

                    const {requestedSongsList, doNotPlaySongsList} = clientSongs;

                    return await SetListsModel.getSetList(userInfo[0].username)
                        .then(async setListInfo => 
                            await res.status(200).send({
                                requestedSongsList, 
                                doNotPlaySongsList,
                                setListAvailable : userInfo[0].setlistavailable,
                                clientApproved : setListInfo.length > 0 ? setListInfo[0].clientapproved : false
                            }));
                });
        })
        .catch(async err => 
            await res.status(500).send({
                errorMessage : "There was a problem getting all of the songs"
            })
        );

}

exports.getSong = async (req, res, next) => {
    const token = req.token;
    const {username} = token;
    const {songId} = req.params;
    
    return await ClientSongListModel.getSong(username, songId)
        .then(async response => 
            await res.status(200).send({
                songInfo : response
            })
        )
        .catch(async err => 
            await res.status(500).send({
                errorMessage : "There was a problem getting the song information"
            })
        );

};

exports.editSong = async (req, res, next) => {
    const {songId} = req.params;
    const token = req.token;
    const {username, id} = token;
    const {songName, artistName, playListType} = req.body;

    return await ClientSongListModel.editSong(songId, songName, artistName, playListType, username)
        .then(async editedSong => {

            return await UsersModel.getUserInfo(id)
                .then(async clientInfo => {

                    const userInfo = clientInfo[0];

                    return await ClientSongListModel.getSongs(userInfo.username)
                        .then(async clientSongs => {

                            const {requestedSongsList, doNotPlaySongsList} = clientSongs;

                            return await SetListsModel.getSetList(userInfo.username)
                                .then(async setListInfo => 
                                    await res.status(200).send({
                                        requestedSongsList, 
                                        doNotPlaySongsList,
                                        setListAvailable : userInfo.setlistavailable,
                                        clientApproved : setListInfo.length > 0 ? setListInfo[0].clientapproved : false
                                    }));
                        });
            });
        })
        .catch(async err => 
            await res.status(500).send({
                errorMessage : "There was a problem editing that song"
            })
        );

};

exports.getCompletedSetList = async (req, res, next) => {
    const token = req.token;
    const {username} = token;

    return await SetListsModel.getSetList(username)
        .then(async response => {

            const {clientname, bandleadername, setlist, bandleadercomments} = response[0];

            return await res.status(200).send({
                clientName : clientname,
                bandleaderName : bandleadername,
                suggestedSetList : setlist.map(song => JSON.parse(song)),
                bandleaderComments : bandleadercomments
            });

        })
        .catch(async err => 
            await res.status(500).send({
                errorMessage : "No Setlist Available yet, check back later"
            })
        );
};

exports.editCompletedSetListComments = async (req, res, next) => {
    const {clientComments, clientApproval} = req.body;
    const token = req.token;
    const {username} = token;

    return await SetListsModel.addClientCommentsAndApprovalStatus(username, clientComments, Boolean(clientApproval))
        .then(async response => 
            await res.status(200).send({
                setListInfo : response[0],
            })
        )
        .catch(async err => 
            await res.status(500).send({
                errorMessage : "There was a problem editing the Set List comments"
            })
        );
};