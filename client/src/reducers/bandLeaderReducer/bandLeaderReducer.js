import {
    ADD_SONG_LOADING,
    ADD_SONG_SUCCESS,
    ADD_SONG_ERROR,
    GET_SONGS_LOADING,
    GET_SONGS_SUCCESS,
    GET_SONGS_ERROR,
    DELETE_SONG_LOADING,
    DELETE_SONG_SUCCESS,
    DELETE_SONG_ERROR,
} from "../../actions/bandLeaderActions/bandLeaderActionTypes";
import { LOGOUT_SUCCESS } from "../../actions/authActions/authActionTypes";

const initialState = {
    setLists : [],
    clientList : [],
    bandLists : [],
    songList : [],
    isLoading : false,
    errorData : {
        status : null,
        errorMessage : null,
    }
}

const bandLeaderReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_SONG_LOADING: case GET_SONGS_LOADING: case DELETE_SONG_LOADING:
        return {
            ...state,
            isLoading : true
        }
        case ADD_SONG_SUCCESS: case GET_SONGS_SUCCESS: case DELETE_SONG_SUCCESS:
            console.log(action.type)
            return {
                ...state,
                songList : action.payload.songList,
                isLoading : false,
            }
        case ADD_SONG_ERROR: case GET_SONGS_ERROR: case DELETE_SONG_ERROR:
            return {
                ...state,
                isLoading : false,
                errorData : {
                    status : action.payload.status,
                    errorMessage : action.payload.data.errorMessage
                }
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