import {
    ADD_BANDLEADER_SONG_LOADING,
    ADD_BANDLEADER_SONG_SUCCESS,
    ADD_BANDLEADER_SONG_ERROR,
    EDIT_BANDLEADER_SONG_LOADING,
    EDIT_BANDLEADER_SONG_ERROR,
    EDIT_BANDLEADER_SONG_SUCCESS,
    GET_BANDLEADER_SONGS_LOADING,
    GET_BANDLEADER_SONGS_SUCCESS,
    GET_BANDLEADER_SONGS_ERROR,
    GET_BANDLEADER_CLIENTS_LOADING,
    GET_BANDLEADER_CLIENTS_SUCCESS,
    GET_BANDLEADER_CLIENTS_ERROR,
    DELETE_BANDLEADER_SONG_LOADING,
    DELETE_BANDLEADER_SONG_SUCCESS,
    DELETE_BANDLEADER_SONG_ERROR,
} from "actions/bandLeaderActions/bandLeaderActionTypes";
import { LOGOUT_SUCCESS } from "actions/authActions/authActionTypes";

const initialState = {
    setLists : [],
    clientList : [],
    bandLists : [],
    songList : [],
    isLoading : false,
};

const bandLeaderReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_BANDLEADER_SONG_LOADING: 
        case GET_BANDLEADER_SONGS_LOADING: 
        case DELETE_BANDLEADER_SONG_LOADING:
        case EDIT_BANDLEADER_SONG_LOADING:
        case GET_BANDLEADER_CLIENTS_LOADING:
        return {
            ...state,
            isLoading : true
        }
        case ADD_BANDLEADER_SONG_SUCCESS: 
        case GET_BANDLEADER_SONGS_SUCCESS: 
        case DELETE_BANDLEADER_SONG_SUCCESS:
        case EDIT_BANDLEADER_SONG_SUCCESS:
            return {
                ...state,
                songList : action.payload.songList,
                isLoading : false,
            }
        case GET_BANDLEADER_CLIENTS_SUCCESS:
            return {
                ...state,
                clientList : action.payload.clientList,
                isLoading : false,
            }
        case ADD_BANDLEADER_SONG_ERROR: 
        case GET_BANDLEADER_SONGS_ERROR: 
        case DELETE_BANDLEADER_SONG_ERROR:
        case EDIT_BANDLEADER_SONG_ERROR:
        case GET_BANDLEADER_CLIENTS_ERROR:
            return {
                ...state,
                isLoading : false,
            }
        case LOGOUT_SUCCESS:
            return {
                ...initialState
            }
        default :
            return {
                ...state
            }
    }
}

export default bandLeaderReducer;