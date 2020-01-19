import axios from "axios";
import {
    GET_CLIENT_SONGS_LOADING,
    GET_CLIENT_SONGS_SUCCESS,
    GET_CLIENT_SONGS_ERROR,
    ADD_CLIENT_REQUESTED_SONG_LOADING,
    ADD_CLIENT_REQUESTED_SONG_SUCCESS,
    ADD_CLIENT_REQUESTED_SONG_ERROR,
    ADD_CLIENT_DO_NOT_PLAY_SONG_LOADING,
    ADD_CLIENT_DO_NOT_PLAY_SONG_SUCCESS,
    ADD_CLIENT_DO_NOT_PLAY_SONG_ERROR,
    DELETE_CLIENT_SONG_LOADING,
    DELETE_CLIENT_SONG_SUCCESS,
    DELETE_CLIENT_SONG_ERROR,
    EDIT_CLIENT_SONG_LOADING,
    EDIT_CLIENT_SONG_SUCCESS,
    EDIT_CLIENT_SONG_ERROR,
    SEND_CLIENT_SETLIST_ERROR,
    SEND_CLIENT_SETLIST_SUCCESS,
    SEND_CLIENT_SETLIST_LOADING,
} from "./clientActionTypes";
import {tokenConfig} from "../authActions/authActions";
import {apiHost} from "config";

export const getClientSongsAction = () => async dispatch => {

    await dispatch({
        type : GET_CLIENT_SONGS_LOADING,
    })

    const headers = await tokenConfig();

    axios.get(`${apiHost}/client/getSongs`, headers)
        .then(async response => {
            await dispatch({
                type : GET_CLIENT_SONGS_SUCCESS,
                payload : response.data,
            })
        })
        .catch(async err => {
            await dispatch({
                type : GET_CLIENT_SONGS_ERROR,
                payload : err.response,
            })
        });

};

export const addClientRequestedSongAction = (songName, artistName) => async dispatch => {

    await dispatch({
        type : ADD_CLIENT_REQUESTED_SONG_LOADING,
    })

    const requestBody = {songName, artistName};
    const headers = await tokenConfig();

    axios.post(`${apiHost}/client/addSong/requestedSong`, requestBody, headers)
        .then(async response => {
            await dispatch({
                type : ADD_CLIENT_REQUESTED_SONG_SUCCESS,
                payload : response.data,
            });
        })
        .catch(async err => {
            await dispatch({
                type : ADD_CLIENT_REQUESTED_SONG_ERROR,
                payload : err.response,
            })
        });
};

export const addClientDoNotPlaySongAction = (songName, artistName) => async dispatch => {
    await dispatch({
        type : ADD_CLIENT_DO_NOT_PLAY_SONG_LOADING,
    })

    const requestBody = {songName, artistName};
    const headers = await tokenConfig();

    axios.post(`${apiHost}/client/addSong/doNotPlaySong`, requestBody, headers)
        .then(async response => {
            await dispatch({
                type : ADD_CLIENT_DO_NOT_PLAY_SONG_SUCCESS,
                payload : response.data,
            });
        })
        .catch(async err => {
            await dispatch({
                type : ADD_CLIENT_DO_NOT_PLAY_SONG_ERROR,
                payload : err.response,
            })
        });
};

export const deleteClientSongAction = songId => async dispatch => {

    await dispatch({
        type : DELETE_CLIENT_SONG_LOADING,
    });


    const headers = tokenConfig();

    axios.delete(`${apiHost}/client/deleteSong/${songId}`, headers)
        .then(async response => {
            await dispatch({
                type : DELETE_CLIENT_SONG_SUCCESS,
                payload : response.data,
            });
        })
        .catch(async err =>{
            await dispatch({
                type : DELETE_CLIENT_SONG_ERROR,
                payload : err.response
            });
        })
    
};

export const editClientSongAction = (songName, artistName, playListType, songId) => async dispatch => {

    await dispatch({
        type : EDIT_CLIENT_SONG_LOADING,
    });

    const requestBody = {
        songName,
        artistName,
        playListType
    };

    const headers = tokenConfig();

    axios.patch(`${apiHost}/client/editSong/${songId}`, requestBody, headers)
        .then(async response => {
            await dispatch({
                type : EDIT_CLIENT_SONG_SUCCESS,
                payload : response.data
            });
        })
        .catch(async err => {
            await dispatch({
                type : EDIT_CLIENT_SONG_ERROR,
                payload : err.response
            })
        });

};

export const sendClientSetlistAction = setlistAvailability => async dispatch => {

    await dispatch({
        type : SEND_CLIENT_SETLIST_LOADING,
    });

    const requestBody = {
        setlistAvailability,
    };

    console.log(setlistAvailability);

    const headers = tokenConfig();

    axios.patch(`${apiHost}/users/sendClientSetlist`, requestBody, headers)
        .then(response => {
            console.log(response.data);
            dispatch({
                type : SEND_CLIENT_SETLIST_SUCCESS,
                payload : response.data
            });
        })
        .catch(err => {
            dispatch({
                type : SEND_CLIENT_SETLIST_ERROR,
                payload : err.response
            });
        })

};