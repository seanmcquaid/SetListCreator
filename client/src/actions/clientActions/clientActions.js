import axios from "axios";
import {
    ADD_CLIENT_REQUESTED_SONG_LOADING,
    ADD_CLIENT_REQUESTED_SONG_SUCCESS,
    ADD_CLIENT_REQUESTED_SONG_ERROR,
    ADD_CLIENT_DO_NOT_PLAY_SONG_LOADING,
    ADD_CLIENT_DO_NOT_PLAY_SONG_SUCCESS,
    ADD_CLIENT_DO_NOT_PLAY_SONG_ERROR,
    GET_CLIENT_REQUESTED_SONGS_LOADING,
    GET_CLIENT_REQUESTED_SONGS_SUCCESS,
    GET_CLIENT_REQUESTED_SONGS_ERROR,
    GET_CLIENT_DO_NOT_PLAY_SONGS_LOADING,
    GET_CLIENT_DO_NOT_PLAY_SONGS_SUCCESS,
    GET_CLIENT_DO_NOT_PLAY_SONGS_ERROR,
    DELETE_CLIENT_REQUESTED_SONG_LOADING,
    DELETE_CLIENT_REQUESTED_SONG_SUCCESS,
    DELETE_CLIENT_REQUESTED_SONG_ERROR,
    DELETE_CLIENT_DO_NOT_PLAY_SONG_LOADING,
    DELETE_CLIENT_DO_NOT_PLAY_SONG_SUCCESS,
    DELETE_CLIENT_DO_NOT_PLAY_SONG_ERROR,
} from "./clientActionTypes";
import {tokenConfig} from "../authActions/authActions";

export const addClientRequestedSongAction = (songName, artistName) => async dispatch => {

    await dispatch({
        type : ADD_CLIENT_REQUESTED_SONG_LOADING,
    })

    const requestBody = {songName, artistName};
    const headers = tokenConfig();

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

const addClientDoNotPlaySongAction = () => async dispatch => {

};