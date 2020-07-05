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
    const source = axios.CancelToken.source();

    const requestBody = {username, password};

    dispatch({
        type : LOGIN_LOADING
    });

    const config = {
        cancelToken : source.token,
    };

    return axios.post(`${apiHost}/users/login/${accountType}`, requestBody, config)
        .then(response => {
            dispatch({
                type : LOGIN_SUCCESS,
                payload : response.data
            });
            source.cancel();
        })
        .catch(err => {
            dispatch({
                type : LOGIN_ERROR,
                payload : err.response.data
            });
            source.cancel();
        });
};

export const registerAction = (username, password, accountType, selectedBandleader) => async dispatch => {
    const source = axios.CancelToken.source();
    
    const requestBody = {username, password, selectedBandleader};

    dispatch({
        type : REGISTER_LOADING
    });

    const config = {
        cancelToken : source.token,
    };

    return axios.post(`${apiHost}/users/register/${accountType}`, requestBody, config)
        .then(response => {
            dispatch({
                type : REGISTER_SUCCESS,
                payload : response.data
            });
            source.cancel();
        })
        .catch(err => {
            dispatch({
                type : REGISTER_ERROR,
                payload : err.response.data
            });
            source.cancel();
        });
};

export const logoutAction = () => dispatch => {

    dispatch({
        type : LOGOUT_LOADING
    });
    
    dispatch({
        type : LOGOUT_SUCCESS
    });
};

export const tokenConfig = () => {
    const token = localStorage.getItem("token");

    const config = {
        headers : {
            "Content-Type" : "application/json"
        },
    };

    if(token){
        config.headers["Authorization"] = token;
    }

    return config;
};

export const checkTokenAction = () => async dispatch => {
    const source = axios.CancelToken.source();

    dispatch({
        type : CHECK_TOKEN_LOADING
    });

    const config = tokenConfig();
    config.cancelToken = source.token;

    return axios.get(`${apiHost}/users/checkToken`, config)
        .then(response => {
            dispatch({
                type : CHECK_TOKEN_SUCCESS,
                payload : response.data
            });
            source.cancel();
        })
        .catch(err => {
            dispatch({
                type : CHECK_TOKEN_ERROR,
                payload : err.response.data
            });
            source.cancel();
        });

}

export const editUserInfoAction = (newUsername, newPassword, accountType) => async dispatch => {
    const source = axios.CancelToken.source();

    dispatch({
        type : EDIT_USER_INFO_LOADING,
    });

    const requestBody = {
        newUsername,
        newPassword,
        accountType
    };

    const config = tokenConfig();
    config.cancelToken = source.token;

    return axios.patch(`${apiHost}/users/editUserInfo`, requestBody, config)
        .then(response => {
            dispatch({
                type : EDIT_USER_INFO_SUCCESS,
                payload : response.data,
            });
            source.cancel();
        })
        .catch(err => {
            dispatch({
                type : EDIT_USER_INFO_ERROR,
                payload : err.response.data,
            });
            source.cancel();
        });


};

export const getUserInfoAction = () => dispatch => {
    const source = axios.CancelToken.source();

    dispatch({
        type : GET_USER_INFO_LOADING,
    });

    const config = tokenConfig();
    config.cancelToken = source.token;

    return axios.get(`${apiHost}/users/getUserInfo`, config)
        .then(async response => {
            dispatch({
                type : GET_USER_INFO_SUCCESS,
                payload : response.data
            });
            source.cancel();
        })
        .catch(err => {
            dispatch({
                type : GET_USER_INFO_ERROR,
                payload : err.response.data,
            });
            source.cancel();
        });
};