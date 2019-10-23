import axios from "axios";
import {
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    REGISTER_LOADING,
    REGISTER_SUCCESS,
    REGISTER_ERROR
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
            userData : response.data
        })
    })
    .catch(err => {
        dispatch({
            type : LOGIN_ERROR,
            errorData : err.response
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
            userData : response.data
        })
    })
    .catch(err => {
        dispatch({
            type : REGISTER_ERROR,
            errorData : err.response
        })
    });

};