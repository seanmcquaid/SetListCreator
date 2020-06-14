import {
    REGISTER_ERROR, 
    LOGIN_ERROR, 
    CHECK_TOKEN_ERROR, 
    EDIT_USER_INFO_ERROR
} from "actions/authActions/authActionTypes";
import {
    ADD_BANDLEADER_SONG_ERROR,
    EDIT_BANDLEADER_SONG_ERROR,
    GET_BANDLEADER_SONGS_ERROR,
    DELETE_BANDLEADER_SONG_ERROR,
} from "actions/bandleaderActions/bandleaderActionTypes";
import {
    GET_CLIENT_SONGS_ERROR,
    ADD_CLIENT_REQUESTED_SONG_ERROR,
    ADD_CLIENT_DO_NOT_PLAY_SONG_ERROR,
    DELETE_CLIENT_SONG_ERROR,
    EDIT_CLIENT_SONG_ERROR,
} from "../../actions/clientActions/clientActionTypes";
import {CLEAR_ERROR_MESSAGE} from "actions/errorActions/errorActionTypes";
import errorReducer from "./errorReducer";

const initialState = {
    errorMessage : "",
};