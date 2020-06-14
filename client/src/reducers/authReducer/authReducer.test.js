import {
    REGISTER_LOADING,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGIN_LOADING,
    LOGOUT_LOADING,
    LOGOUT_SUCCESS,
    CHECK_TOKEN_LOADING,
    CHECK_TOKEN_SUCCESS,
    CHECK_TOKEN_ERROR,
    EDIT_USER_INFO_LOADING,
    EDIT_USER_INFO_SUCCESS,
    EDIT_USER_INFO_ERROR,
    GET_USER_INFO_LOADING,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_ERROR,
} from "actions/authActions/authActionTypes";
import authReducer from "./authReducer";

const initialState = {
    isAuthenticated : false,
    token : localStorage.getItem("token"),
    username : "",
    accountType : "",
    isLoading : false,
};