import axios from "axios";
import {
    ADD_SONG_LOADING,
    ADD_SONG_SUCCESS,
    ADD_SONG_ERROR,
    GET_SONGS_LOADING,
    GET_SONGS_SUCCESS,
    GET_SONGS_ERROR,
    DELETE_SONG_LOADING,
    DELETE_SONG_SUCCESS,
    DELETE_SONG_ERROR
} from "./bandLeaderActionTypes";
import { tokenConfig } from "../authActions/authActions";
import authReducer from "../../reducers/authReducer/authReducer";

export const addSongAction = (songName, artistName, songKey) => async dispatch => {

    await dispatch({
        type : ADD_SONG_LOADING
    })

    const requestBody = {songName, artistName, songKey};
    const headers = tokenConfig();

    axios.post(`${window.apiHost}/bandLeader/addSong`, requestBody, headers)
        .then(async response => {
            await dispatch({
                type : ADD_SONG_SUCCESS,
                payload : response.data
            });
        })
        .catch(async err => {
            await dispatch({
                type : ADD_SONG_ERROR,
                payload : err.response
            });
        });

};

export const deleteSongAction = (songName, artistName, songKey) => async dispatch => {

    await dispatch({
        type : DELETE_SONG_LOADING,
    })

    const requestBody = {songName, artistName, songKey};
    const headers = tokenConfig();

    const config = {
        data : requestBody,
        headers : {
            Authorization : headers.headers["Authorization"]
        }
    }

    console.log(config)

    axios.delete(`${window.apiHost}/bandLeader/deleteSong`, config)
            .then(async response => {
                await dispatch({
                    type : DELETE_SONG_SUCCESS,
                    payload : response.data
                });
            })
            .catch(async err => {
                await dispatch({
                    type : DELETE_SONG_ERROR,
                    payload : err.response
                });
            });

}

export const getSongsAction = () => async dispatch => {

    await dispatch({
        type : GET_SONGS_LOADING,
    })

    const headers = tokenConfig();

     axios.get(`${window.apiHost}/bandLeader/getSongs`, headers)
        .then(async response => {
            await dispatch({
                type : GET_SONGS_SUCCESS,
                payload : response.data
            });
        })
        .catch(async err => {
            await dispatch({
                type : GET_SONGS_ERROR,
                payload : err.response
            });
        });
};