import axios from "axios";
import {
    ADD_SONG_LOADING,
    ADD_SONG_SUCCESS,
    ADD_SONG_ERROR,
    GET_SONGS_LOADING,
    GET_SONGS_SUCCESS,
    GET_SONGS_ERROR
} from "./bandLeaderActionTypes";
import { tokenConfig } from "../authActions/authActions";

export const addSongAction = (songName, artistName, songKey) => async dispatch => {

    await dispatch({
        type : ADD_SONG_LOADING
    })

    const requestBody = {songName, artistName, songKey};
    const headers = tokenConfig();

    axios.post(`${window.apiHost}/bandLeader/addSong`, requestBody, headers)
        .then(response => {
            dispatch({
                type : ADD_SONG_SUCCESS,
                payload : response.data
            })
        })
        .catch(err => {
            dispatch({
                type : ADD_SONG_ERROR,
                payload : err.response
            })
        })

}

export const getSongsAction = () => async dispatch => {

    await dispatch({
        type : GET_SONGS_LOADING,
    })

    const headers = tokenConfig();

    axios.get(`${window.apiHost}/bandLeader/getSongs`, headers)
        .then(response => {
            dispatch({
                type : GET_SONGS_SUCCESS,
                payload : response.data
            })
        })
        .catch(err => {
            dispatch({
                type : GET_SONGS_ERROR,
                payload : err.response
            })
        })
}