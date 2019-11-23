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
    DELETE_CLIENT_REQUESTED_SONG_LOADING,
    DELETE_CLIENT_REQUESTED_SONG_SUCCESS,
    DELETE_CLIENT_REQUESTED_SONG_ERROR,
    DELETE_CLIENT_DO_NOT_PLAY_SONG_LOADING,
    DELETE_CLIENT_DO_NOT_PLAY_SONG_SUCCESS,
    DELETE_CLIENT_DO_NOT_PLAY_SONG_ERROR,
} from "./clientActionTypes";
import {tokenConfig} from "../authActions/authActions";

export const getClientSongsAction = () => async dispatch => {

    await dispatch({
        type : GET_CLIENT_SONGS_LOADING,
    })

    const headers = await tokenConfig();

    axios.get(`${window.apiHost}/client/getSongs`, headers)
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

    axios.post(`${window.apiHost}/client/addSong/requestedSong`, requestBody, headers)
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

    axios.post(`${window.apiHost}/client/addSong/doNotPlaySong`, requestBody, headers)
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

export const deleteClientRequestedSongAction = (songName, artistName) => async dispatch => {

    await dispatch({
        type : DELETE_CLIENT_REQUESTED_SONG_LOADING,
    });

    // refactor this to use the following object format for all delete requests

    const headers = tokenConfig();

    const config = {
        headers : headers.headers,
        params : {
            id : songId
        }
    }
    
};

export const deleteClientDoNotPlaySongAction = (songName, artistName) => async dipsatch => {

    await dispatch({
        type : DELETE_CLIENT_DO_NOT_PLAY_SONG_LOADING,
    });

};