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
} from "../../actions/clientActions/clientActionTypes";
import { LOGOUT_SUCCESS } from "../../actions/authActions/authActionTypes";

const initialState = {
    bandLeader : "",
    doNotPlayList : [],
    requestedSongsList : [],
    isLoading : false,
    errorData : {
        status : null,
        errorMessage : null,
    }
};

const clientReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_CLIENT_REQUESTED_SONG_LOADING :
            return {
                ...state,
                isLoading : true,
            }
        case ADD_CLIENT_REQUESTED_SONG_SUCCESS :
            console.log(action.payload)
            return {
                ...state,
                requestedSongsList : action.payload.requestedSongsList,
                isLoading : false,
            }
        case ADD_CLIENT_REQUESTED_SONG_ERROR :
            console.log(action.payload)
            return {
                ...state,
                errorData : {
                    status : action.payload.status,
                    errorMessage : action.payload.data.errorMessage
                },
                isLoading : false,
            }
        case LOGOUT_SUCCESS :
            return {
                ...initialState
            }
        default:
            return {
                ...state
            }
    }
}

export default clientReducer;