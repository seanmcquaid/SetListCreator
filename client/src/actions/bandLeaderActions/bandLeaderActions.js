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

export const addBandleaderSongAction = (songName, artistName, songKey) => async dispatch => {

    await dispatch({
        type : ADD_BANDLEADER_SONG_LOADING
    })

    const requestBody = {songName, artistName, songKey};
    const headers = tokenConfig();

    axios.post(`${apiHost}/bandleader/addSong`, requestBody, headers)
        .then(async response => {
            await dispatch({
                type : ADD_BANDLEADER_SONG_SUCCESS,
                payload : response.data
            });
        })
        .catch(async err => {
            await dispatch({
                type : ADD_BANDLEADER_SONG_ERROR,
                payload : err.response
            });
        });

};

export const deleteBandleaderSongAction = songId => async dispatch => {

    await dispatch({
        type : DELETE_BANDLEADER_SONG_LOADING,
    })
    
    const headers = tokenConfig();

    axios.delete(`${apiHost}/bandleader/deleteSong/${songId}`, headers)
            .then(async response => {
                await dispatch({
                    type : DELETE_BANDLEADER_SONG_SUCCESS,
                    payload : response.data
                });
            })
            .catch(async err => {
                await dispatch({
                    type : DELETE_BANDLEADER_SONG_ERROR,
                    payload : err.response
                });
            });

}

export const getBandleaderSongsAction = () => async dispatch => {

    await dispatch({
        type : GET_BANDLEADER_SONGS_LOADING,
    })

    const headers = tokenConfig();

     axios.get(`${apiHost}/bandleader/getSongs`, headers)
        .then(async response => {
            await dispatch({
                type : GET_BANDLEADER_SONGS_SUCCESS,
                payload : response.data
            });
        })
        .catch(async err => {
            await dispatch({
                type : GET_BANDLEADER_SONGS_ERROR,
                payload : err.response
            });
        });
};

export const editBandleaderSongAction = (songName, artistName, songKey, songId) => async dispatch => {

    await dispatch({
        type : EDIT_BANDLEADER_SONG_LOADING,
    });

    const requestBody = {
        songName,
        artistName,
        songKey
    };

    const headers = tokenConfig();

    axios.patch(`${apiHost}/bandleader/editSong/${songId}`, requestBody, headers)
        .then(async response => {
            await dispatch({
                type : EDIT_BANDLEADER_SONG_SUCCESS,
                payload : response.data
            });
        })
        .catch(async err => {
            await dispatch({
                type : EDIT_BANDLEADER_SONG_ERROR,
                payload : err.response
            })
        });

};

export const getBandleaderClientsAction = () => async dispatch => {

    await dispatch({
        type : GET_BANDLEADER_CLIENTS_LOADING,
    });

    const headers = tokenConfig();

    axios.get(`${apiHost}/users/getClientsForBandleader`, headers)
        .then(async response => {
            await dispatch({
                type : GET_BANDLEADER_CLIENTS_SUCCESS,
                payload : response.data,
            });
        })
        .catch(async err => {
            await dispatch({
                type : GET_BANDLEADER_CLIENTS_ERROR,
                payload : err.response,
            });
        });


};