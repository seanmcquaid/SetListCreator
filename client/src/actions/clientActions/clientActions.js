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

const source = axios.CancelToken.source();

export const getClientSongsAction = () => dispatch => {
    source.cancel();

    dispatch({
        type : GET_CLIENT_SONGS_LOADING,
    });

    const headers = tokenConfig();

    return axios.get(`${apiHost}/client/getSongs`, headers)
        .then(response => {
            dispatch({
                type : GET_CLIENT_SONGS_SUCCESS,
                payload : response.data,
            })
        })
        .catch(err => {
            dispatch({
                type : GET_CLIENT_SONGS_ERROR,
                payload : err.response.data,
            })
        });
};

export const addClientRequestedSongAction = (songName, artistName) => dispatch => {
    source.cancel();

    dispatch({
        type : ADD_CLIENT_REQUESTED_SONG_LOADING,
    });

    const requestBody = {songName, artistName};
    const headers = tokenConfig();

    return axios.post(`${apiHost}/client/addSong/requestedSong`, requestBody, headers)
        .then(response => {
            dispatch({
                type : ADD_CLIENT_REQUESTED_SONG_SUCCESS,
                payload : response.data,
            });
        })
        .catch(err => {
            dispatch({
                type : ADD_CLIENT_REQUESTED_SONG_ERROR,
                payload : err.response.data,
            });
        });
};

export const addClientDoNotPlaySongAction = (songName, artistName) => dispatch => {
    source.cancel();

    dispatch({
        type : ADD_CLIENT_DO_NOT_PLAY_SONG_LOADING,
    });

    const requestBody = {songName, artistName};
    const headers = tokenConfig();

    return axios.post(`${apiHost}/client/addSong/doNotPlaySong`, requestBody, headers)
        .then(response => {
            dispatch({
                type : ADD_CLIENT_DO_NOT_PLAY_SONG_SUCCESS,
                payload : response.data,
            });
        })
        .catch(err => {
            dispatch({
                type : ADD_CLIENT_DO_NOT_PLAY_SONG_ERROR,
                payload : err.response.data,
            });
        });
};

export const deleteClientSongAction = songId => dispatch => {
    source.cancel();

    dispatch({
        type : DELETE_CLIENT_SONG_LOADING,
    });

    const headers = tokenConfig();

    return axios.delete(`${apiHost}/client/deleteSong/${songId}`, headers)
        .then(response => {
            dispatch({
                type : DELETE_CLIENT_SONG_SUCCESS,
                payload : response.data,
            });
        })
        .catch(err =>{
            dispatch({
                type : DELETE_CLIENT_SONG_ERROR,
                payload : err.response.data
            });
        })
    
};

export const editClientSongAction = (songName, artistName, playListType, songId) => dispatch => {
    source.cancel();

    dispatch({
        type : EDIT_CLIENT_SONG_LOADING,
    });

    const requestBody = {
        songName,
        artistName,
        playListType
    };

    const headers = tokenConfig();

    return axios.patch(`${apiHost}/client/editSong/${songId}`, requestBody, headers)
        .then(response => {
            dispatch({
                type : EDIT_CLIENT_SONG_SUCCESS,
                payload : response.data
            });
        })
        .catch(err => {
            dispatch({
                type : EDIT_CLIENT_SONG_ERROR,
                payload : err.response.data
            })
        });

};

export const sendClientSetListAction = setListAvailability => dispatch => {
    source.cancel();

    dispatch({
        type : SEND_CLIENT_SETLIST_LOADING,
    });

    const requestBody = {
        setListAvailability,
    };

    const headers = tokenConfig();

    return axios.patch(`${apiHost}/users/sendClientSetList`, requestBody, headers)
        .then(response => {
            dispatch({
                type : SEND_CLIENT_SETLIST_SUCCESS,
                payload : response.data
            });
        })
        .catch(err => {
            dispatch({
                type : SEND_CLIENT_SETLIST_ERROR,
                payload : err.response.data
            });
        })

};