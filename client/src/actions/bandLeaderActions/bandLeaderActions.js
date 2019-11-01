import axios from "axios";
import {
    ADD_SONG_LOADING,
    ADD_SONG_SUCCESS,
    ADD_SONG_ERROR
} from "./bandLeaderActionTypes";
import { tokenConfig } from "../authActions/authActions";

export const addSongAction = (songName, artistName, key) => async dispatch => {

    dispatch({
        type : ADD_SONG_LOADING
    })

    const requestBody = {songName, artistName,key};
    const headers = tokenConfig();

    axios.post("/bandLeader/addSong", requestBody, headers)
        .then(response => {
            console.log(response)
            dispatch({
                type : ADD_SONG_SUCCESS
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type : ADD_SONG_ERROR
            })
        })

}