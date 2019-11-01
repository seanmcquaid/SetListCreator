import axios from "axios";
import {
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    REGISTER_LOADING,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    LOGOUT_LOADING,
    LOGOUT_SUCCESS,
    CHECK_TOKEN_SUCCESS,
    CHECK_TOKEN_LOADING,
    CHECK_TOKEN_FAILURE
} from "./authActionTypes";

export const loginAction = (username, password) => async dispatch => {

    const requestBody = {username, password};

    dispatch({
        type : LOGIN_LOADING
    });

    axios.post(`${window.apiHost}/users/login`, requestBody)
    .then(response =>{
        dispatch({
            type : LOGIN_SUCCESS,
            payload : response.data
        })
    })
    .catch(err => {
        dispatch({
            type : LOGIN_ERROR,
            payload : err.response
        })
    });
};

export const registerAction = (username, password, duplicatePassword, accountType) => async dispatch => {

    const requestBody = {username, password, duplicatePassword};

    dispatch({
        type : REGISTER_LOADING
    });

    axios.post(`${window.apiHost}/users/register/${accountType}`, requestBody)
    .then(response =>{
        dispatch({
            type : REGISTER_SUCCESS,
            payload : response.data
        })
    })
    .catch(err => {
        dispatch({
            type : REGISTER_ERROR,
            payload : err.response
        })
    });

};

export const logoutAction = () => async dispatch => {

    dispatch({
        type : LOGOUT_LOADING
    });
    
    dispatch({
        type : LOGOUT_SUCCESS
    });
}

export const tokenConfig = () => {
    const token = localStorage.getItem("token");

    const config = {
        headers : {
            "Content-Type" : "application/json"
        }
    }

    if(token){
        config.headers["x-auth-token"] = token;
    }

    return config;

}

export const checkTokenAction = () => async dispatch => {

    dispatch({
        type : CHECK_TOKEN_LOADING
    })

    const headers = tokenConfig();

    axios.get(`${window.apiHost}/users/checkToken`, headers)
        .then(response => {
            dispatch({
                type : CHECK_TOKEN_SUCCESS,
                payload : response.data
            })
        })
        .catch(err => {
            dispatch({
                type : CHECK_TOKEN_FAILURE,
                payload : err.response
            })
        })

}