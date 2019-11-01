import axios from "axios";
import {
    ADD_SONG_LOADING,
    ADD_SONG_SUCCESS,
    ADD_SONG_ERROR
} from "./bandLeaderActionTypes";
import { tokenConfig } from "../authActions/authActions";

export const addSongAction = (songName, artistName, songKey) => async dispatch => {

    dispatch({
        type : ADD_SONG_LOADING
    })

    const requestBody = {songName, artistName, songKey};
    const headers = tokenConfig();
    console.log(headers)

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