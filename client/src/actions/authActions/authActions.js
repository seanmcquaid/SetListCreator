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
    CHECK_TOKEN_ERROR,
    EDIT_USER_INFO_LOADING,
    EDIT_USER_INFO_SUCCESS,
    EDIT_USER_INFO_ERROR,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_ERROR,
    GET_USER_INFO_LOADING
} from "./authActionTypes";
import {apiHost} from "config";

export const loginAction = (username, password, accountType) => async dispatch => {

    const requestBody = {username, password};

    dispatch({
        type : LOGIN_LOADING
    });

    return axios.post(`${apiHost}/users/login/${accountType}`, requestBody)
        .then(response => {
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

export const registerAction = (username, password, accountType, selectedBandleader) => async dispatch => {

    const requestBody = {username, password, selectedBandleader};

    dispatch({
        type : REGISTER_LOADING
    });

    return axios.post(`${apiHost}/users/register/${accountType}`, requestBody)
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
        config.headers["Authorization"] = token;
    }

    return config;

}

export const checkTokenAction = () => async dispatch => {

    dispatch({
        type : CHECK_TOKEN_LOADING
    })

    const headers = tokenConfig();

    return axios.get(`${apiHost}/users/checkToken`, headers)
        .then(response => {
            dispatch({
                type : CHECK_TOKEN_SUCCESS,
                payload : response.data
            })
        })
        .catch(err => {
            dispatch({
                type : CHECK_TOKEN_ERROR,
                payload : err.response
            })
        })

}

export const editUserInfoAction = (newUsername, newPassword, accountType) => async dispatch => {
    
    dispatch({
        type : EDIT_USER_INFO_LOADING,
    })

    const requestBody = {
        newUsername,
        newPassword,
        accountType
    }

    const headers = tokenConfig();

    return axios.patch(`${apiHost}/users/editUserInfo`, requestBody, headers)
        .then(response => {
            dispatch({
                type : EDIT_USER_INFO_SUCCESS,
                payload : response.data,
            })
        })
        .catch(err => {
            dispatch({
                type : EDIT_USER_INFO_ERROR,
                payload : err.response,
            })
        });


};

export const getUserInfoAction = () => dispatch => {
    dispatch({
        type : GET_USER_INFO_LOADING,
    })

    const headers = tokenConfig();
    return axios.get(`${apiHost}/users/getUserInfo`, headers)
        .then(async response => {
            dispatch({
                type : GET_USER_INFO_SUCCESS,
                payload : response.data
            });
        })
        .catch(err => {
            dispatch({
                type : GET_USER_INFO_ERROR,
                payload : err.response,
            })
        });
};