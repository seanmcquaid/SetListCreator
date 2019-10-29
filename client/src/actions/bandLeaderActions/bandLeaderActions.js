import axios from "axios";
import {
    ADD_SONG_LOADING,
    ADD_SONG_SUCCESS,
    ADD_SONG_ERROR
} from "./bandLeaderActionTypes";

export const addSongAction = () => async dispatch => {

    dispatch({
        type : ADD_SONG_LOADING
    })

    


}