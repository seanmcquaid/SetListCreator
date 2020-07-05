import axios from "axios";
import {
    ADD_BANDLEADER_SONG_LOADING,
    ADD_BANDLEADER_SONG_SUCCESS,
    ADD_BANDLEADER_SONG_ERROR,
    EDIT_BANDLEADER_SONG_LOADING,
    EDIT_BANDLEADER_SONG_SUCCESS,
    EDIT_BANDLEADER_SONG_ERROR,
    GET_BANDLEADER_SONGS_LOADING,
    GET_BANDLEADER_SONGS_SUCCESS,
    GET_BANDLEADER_SONGS_ERROR,
    GET_BANDLEADER_CLIENTS_LOADING,
    GET_BANDLEADER_CLIENTS_SUCCESS,
    GET_BANDLEADER_CLIENTS_ERROR,
    DELETE_BANDLEADER_SONG_LOADING,
    DELETE_BANDLEADER_SONG_SUCCESS,
    DELETE_BANDLEADER_SONG_ERROR,
} from "./bandleaderActionTypes";
import { tokenConfig } from "../authActions/authActions";
import { apiHost } from "config";

const source = axios.CancelToken.source();

export const addBandleaderSongAction = (songName, artistName, songKey) => dispatch => {
    source.cancel();

    dispatch({
        type : ADD_BANDLEADER_SONG_LOADING,
    });

    const requestBody = {songName, artistName, songKey};
    const headers = tokenConfig();

    return axios.post(`${apiHost}/bandleader/addSong`, requestBody, headers)
        .then(response => {
            dispatch({
                type : ADD_BANDLEADER_SONG_SUCCESS,
                payload : response.data
            });
        })
        .catch(err => {
            dispatch({
                type : ADD_BANDLEADER_SONG_ERROR,
                payload : err.response.data
            });
        });

};

export const deleteBandleaderSongAction = songId => dispatch => {
    source.cancel();
    
    dispatch({
        type : DELETE_BANDLEADER_SONG_LOADING,
    });
    
    const headers = tokenConfig();

    return axios.delete(`${apiHost}/bandleader/deleteSong/${songId}`, headers)
        .then(response => {
            dispatch({
                type : DELETE_BANDLEADER_SONG_SUCCESS,
                payload : response.data
            });
        })
        .catch(err => {
            dispatch({
                type : DELETE_BANDLEADER_SONG_ERROR,
                payload : err.response.data
            });
        });

}

export const getBandleaderSongsAction = () => dispatch => {
    source.cancel();

    dispatch({
        type : GET_BANDLEADER_SONGS_LOADING,
    });

    const headers = tokenConfig();

    return axios.get(`${apiHost}/bandleader/getSongs`, headers)
        .then(response => {
            dispatch({
                type : GET_BANDLEADER_SONGS_SUCCESS,
                payload : response.data
            });
        })
        .catch(err => {
            dispatch({
                type : GET_BANDLEADER_SONGS_ERROR,
                payload : err.response.data
            });
        });
};

export const editBandleaderSongAction = (songName, artistName, songKey, songId) => dispatch => {
    source.cancel();

    dispatch({
        type : EDIT_BANDLEADER_SONG_LOADING,
    });

    const requestBody = {
        songName,
        artistName,
        songKey
    };

    const headers = tokenConfig();

    return axios.patch(`${apiHost}/bandleader/editSong/${songId}`, requestBody, headers)
        .then(response => {
            dispatch({
                type : EDIT_BANDLEADER_SONG_SUCCESS,
                payload : response.data
            });
        })
        .catch(err => {
            dispatch({
                type : EDIT_BANDLEADER_SONG_ERROR,
                payload : err.response.data
            })
        });

};

export const getBandleaderClientsAction = () => dispatch => {
    source.cancel();

    dispatch({
        type : GET_BANDLEADER_CLIENTS_LOADING,
    });

    const headers = tokenConfig();

    return axios.get(`${apiHost}/users/getClientsForBandleader`, headers)
        .then(response => {
            dispatch({
                type : GET_BANDLEADER_CLIENTS_SUCCESS,
                payload : response.data,
            });
        })
        .catch(err => {
            dispatch({
                type : GET_BANDLEADER_CLIENTS_ERROR,
                payload : err.response.data,
            });
        });
};