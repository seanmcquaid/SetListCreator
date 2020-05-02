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

const initialState = {
    bandLeader : "",
    doNotPlaySongsList : [],
    requestedSongsList : [],
    isLoading : false,
    setListAvailable : false,
    clientApproved : false
};

const clientReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_CLIENT_SONGS_LOADING : 
        case ADD_CLIENT_REQUESTED_SONG_LOADING : 
        case ADD_CLIENT_DO_NOT_PLAY_SONG_LOADING :
        case DELETE_CLIENT_SONG_LOADING :
        case EDIT_CLIENT_SONG_LOADING :
        case SEND_CLIENT_SETLIST_LOADING :
            return {
                ...state,
                isLoading : true,
            }
        case GET_CLIENT_SONGS_SUCCESS : 
        case ADD_CLIENT_REQUESTED_SONG_SUCCESS : 
        case ADD_CLIENT_DO_NOT_PLAY_SONG_SUCCESS :
        case DELETE_CLIENT_SONG_SUCCESS :
        case EDIT_CLIENT_SONG_SUCCESS :
            console.log(action.payload)
            return {
                ...state,
                requestedSongsList : action.payload.requestedSongsList,
                doNotPlaySongsList : action.payload.doNotPlaySongsList,
                setListAvailable : action.payload.setListAvailable,
                clientApproved : action.clientApproved,
                isLoading : false,
            }
        case SEND_CLIENT_SETLIST_SUCCESS :
        case LOGIN_SUCCESS: 
            return {
                ...state,
                isLoading : false,
                setListAvailable : action.payload.setListAvailable,
            }
        case GET_CLIENT_SONGS_ERROR : 
        case ADD_CLIENT_REQUESTED_SONG_ERROR :
        case ADD_CLIENT_DO_NOT_PLAY_SONG_ERROR :
        case DELETE_CLIENT_SONG_ERROR :
        case EDIT_CLIENT_SONG_ERROR :
        case SEND_CLIENT_SETLIST_ERROR :
            return {
                ...state,
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