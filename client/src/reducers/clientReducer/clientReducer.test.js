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
    DELETE_CLIENT_SONG_LOADING,
    DELETE_CLIENT_SONG_SUCCESS,
    DELETE_CLIENT_SONG_ERROR,
    EDIT_CLIENT_SONG_LOADING,
    EDIT_CLIENT_SONG_SUCCESS,
    EDIT_CLIENT_SONG_ERROR,
    SEND_CLIENT_SETLIST_SUCCESS,
    SEND_CLIENT_SETLIST_LOADING,
    SEND_CLIENT_SETLIST_ERROR,
} from "actions/clientActions/clientActionTypes";
import {LOGIN_SUCCESS, LOGOUT_SUCCESS} from "actions/authActions/authActionTypes";
import clientReducer from "./clientReducer";

const initialState = {
    bandleader : "",
    doNotPlaySongsList : [],
    requestedSongsList : [],
    isLoading : false,
    setListAvailable : false,
    clientApproved : false
};