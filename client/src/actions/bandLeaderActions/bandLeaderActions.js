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

export const addBandleaderSongAction = (songName, artistName, songKey) => dispatch => {
    const source = axios.CancelToken.source();

    dispatch({
        type : ADD_BANDLEADER_SONG_LOADING,
    });

    const requestBody = {
        songName, 
        artistName, 
        songKey,
    };

    const config = tokenConfig();
    config.cancelToken = source.token;

    return axios.post(`${apiHost}/bandleader/addSong`, requestBody, config)
        .then(response => {
            dispatch({
                type : ADD_BANDLEADER_SONG_SUCCESS,
                payload : response.data
            });
            source.cancel();
        })
        .catch(err => {
            dispatch({
                type : ADD_BANDLEADER_SONG_ERROR,
                payload : err.response.data
            });
            source.cancel();
        });

};

export const deleteBandleaderSongAction = songId => dispatch => {
    const source = axios.CancelToken.source();
    
    dispatch({
        type : DELETE_BANDLEADER_SONG_LOADING,
    });
    
    const config = tokenConfig();
    config.cancelToken = source.token;

    return axios.delete(`${apiHost}/bandleader/deleteSong/${songId}`, config)
        .then(response => {
            dispatch({
                type : DELETE_BANDLEADER_SONG_SUCCESS,
                payload : response.data
            });
            source.cancel();
        })
        .catch(err => {
            dispatch({
                type : DELETE_BANDLEADER_SONG_ERROR,
                payload : err.response.data
            });
            source.cancel();
        });

}

export const getBandleaderSongsAction = () => dispatch => {
    const source = axios.CancelToken.source();

    dispatch({
        type : GET_BANDLEADER_SONGS_LOADING,
    });

    const config = tokenConfig();
    config.cancelToken = source.token;

    return axios.get(`${apiHost}/bandleader/getSongs`, config)
        .then(response => {
            dispatch({
                type : GET_BANDLEADER_SONGS_SUCCESS,
                payload : response.data
            });
            source.cancel();
        })
        .catch(err => {
            dispatch({
                type : GET_BANDLEADER_SONGS_ERROR,
                payload : err.response.data
            });
            source.cancel();
        });
};

export const editBandleaderSongAction = (songName, artistName, songKey, songId) => dispatch => {
    const source = axios.CancelToken.source();

    dispatch({
        type : EDIT_BANDLEADER_SONG_LOADING,
    });

    const requestBody = {
        songName,
        artistName,
        songKey
    };

    const config = tokenConfig();
    config.cancelToken = source.token;

    return axios.patch(`${apiHost}/bandleader/editSong/${songId}`, requestBody, config)
        .then(response => {
            dispatch({
                type : EDIT_BANDLEADER_SONG_SUCCESS,
                payload : response.data
            });
            source.cancel();
        })
        .catch(err => {
            dispatch({
                type : EDIT_BANDLEADER_SONG_ERROR,
                payload : err.response.data
            });
            source.cancel();
        });

};

export const getBandleaderClientsAction = () => dispatch => {
    const source = axios.CancelToken.source();

    dispatch({
        type : GET_BANDLEADER_CLIENTS_LOADING,
    });

    const config = tokenConfig();
    config.cancelToken = source.token;

    return axios.get(`${apiHost}/users/getClientsForBandleader`, config)
        .then(response => {
            dispatch({
                type : GET_BANDLEADER_CLIENTS_SUCCESS,
                payload : response.data,
            });
            source.cancel();
        })
        .catch(err => {
            dispatch({
                type : GET_BANDLEADER_CLIENTS_ERROR,
                payload : err.response.data,
            });
            source.cancel();
        });
};