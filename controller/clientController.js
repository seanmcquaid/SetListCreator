const ClientSongListModel = require("../models/ClientSongListModel");
const UsersModel = require("../models/UsersModel");
const SetListsModel = require("../models/SetListsModel");

exports.postAddSong = (req, res, next) => {
    const {songName, artistName} = req.body;
    const {songType} = req.params;
    const token = req.token;
    const {username, id} = token;
    
    ClientSongListModel.addSong(songName, artistName, songType, username)
        .then(addedSong => {

            UsersModel.getUserInfo(id)
                .then(clientInfo => {

                    const userInfo = clientInfo[0];

                    ClientSongListModel.getSongs(userInfo.username)
                        .then(clientSongs => {

                            const {requestedSongsList, doNotPlaySongsList} = clientSongs;

                            SetListsModel.getSetList(userInfo.username)
                                .then(setListInfo => 
                                    res.status(200).send({
                                        requestedSongsList, 
                                        doNotPlaySongsList,
                                        setListAvailable : userInfo.setlistavailable,
                                        clientApproved : setListInfo.length > 0 ? setListInfo[0].clientapproved : false,
                                    }));
                        });
            });
        })
        .catch(err => 
            res.status(500).send({
                errorMessage : "There was a problem adding the song"
            })
        );
};

exports.deleteSong = (req, res, next) => {
    const {songId} = req.params;
    const token = req.token;
    const {username, id} = token;

    ClientSongListModel.deleteSong(username, songId)
        .then(deletedSong => {

            UsersModel.getUserInfo(id)
                .then(clientInfo => {

                    const userInfo = clientInfo[0];

                    ClientSongListModel.getSongs(userInfo.username)
                        .then(clientSongs => {

                            const {requestedSongsList, doNotPlaySongsList} = clientSongs;

                            SetListsModel.getSetList(userInfo.username)
                                .then(setListInfo => 
                                    res.status(200).send({
                                        requestedSongsList, 
                                        doNotPlaySongsList,
                                        setListAvailable : userInfo.setlistavailable,
                                        clientApproved : setListInfo.length > 0 ? setListInfo[0].clientapproved : false
                                    }));
                        });
            });
        })
        .catch(err => 
            res.status(500).send({
                errorMessage : "There was a problem deleting the song"
            })
        );

};

exports.getSongs = (req, res, next) => {
    const token = req.token;
    const {username, id} = token;

    ClientSongListModel.getSongs(username)
        .then(clientSongs => {

            UsersModel.getUserInfo(id)
                .then(userInfo => {

                    const {requestedSongsList, doNotPlaySongsList} = clientSongs;

                    SetListsModel.getSetList(userInfo[0].username)
                        .then(setListInfo => 
                            res.status(200).send({
                                requestedSongsList, 
                                doNotPlaySongsList,
                                setListAvailable : userInfo[0].setlistavailable,
                                clientApproved : setListInfo.length > 0 ? setListInfo[0].clientapproved : false
                            }));
                });
        })
        .catch(err => 
            res.status(500).send({
                errorMessage : "There was a problem getting all of the songs"
            })
        );

}

exports.getSong = (req, res, next) => {
    const token = req.token;
    const {username} = token;
    const {songId} = req.params;
    
    ClientSongListModel.getSong(username, songId)
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

};

exports.editSong = (req, res, next) => {
    const {songId} = req.params;
    const token = req.token;
    const {username, id} = token;
    const {songName, artistName, playListType} = req.body;

    ClientSongListModel.editSong(songId, songName, artistName, playListType, username)
        .then(editedSong => {

            UsersModel.getUserInfo(id)
                .then(clientInfo => {

                    const userInfo = clientInfo[0];

                    ClientSongListModel.getSongs(userInfo.username)
                        .then(clientSongs => {

                            const {requestedSongsList, doNotPlaySongsList} = clientSongs;

                            SetListsModel.getSetList(userInfo.username)
                                .then(setListInfo => 
                                    res.status(200).send({
                                        requestedSongsList, 
                                        doNotPlaySongsList,
                                        setListAvailable : userInfo.setlistavailable,
                                        clientApproved : setListInfo.length > 0 ? setListInfo[0].clientapproved : false
                                    }));
                        });
            });
        })
        .catch(err => 
            res.status(500).send({
                errorMessage : "There was a problem editing that song"
            })
        );

};

exports.getCompletedSetList = (req, res, next) => {
    const token = req.token;
    const {username} = token;

    SetListsModel.getSetList(username)
        .then(response => {

            const {clientname, bandleadername, setlist, bandleadercomments} = response[0];

            return res.status(200).send({
                clientName : clientname,
                bandleaderName : bandleadername,
                suggestedSetList : setlist.map(song => JSON.parse(song)),
                bandleaderComments : bandleadercomments
            });

        })
        .catch(err => 
            res.status(500).send({
                errorMessage : "No Setlist Available yet, check back later"
            })
        );
};

exports.editCompletedSetListComments = (req, res, next) => {
    const {clientComments, clientApproval} = req.body;
    const token = req.token;
    const {username} = token;

    SetListsModel.addClientCommentsAndApprovalStatus(username, clientComments, Boolean(clientApproval))
        .then(response => 
            res.status(200).send({
                setListInfo : response[0],
            })
        )
        .catch(err => 
            res.status(500).send({
                errorMessage : "There was a problem editing the Set List comments"
            })
        );
};