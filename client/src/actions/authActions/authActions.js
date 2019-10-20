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

    dispatch({
        type : LOGIN_LOADING
    });

    axios.post(`${window.apiHost}/users/login`)
    .then(response =>{
        dispatch({
            type : LOGIN_SUCCESS,
            userData : response.data
        })
    })
    .catch(err => {
        dispatch({
            type : LOGIN_ERROR,
            errorData : err
        })
    });
};

export const registerAction = (accountType) => async dispatch => {
    // username, password, duplicatePassword, accountType
    console.log("it fired off")

    dispatch({
        type : REGISTER_LOADING
    });

    console.log(accountType)

    let username = "shrimp"

    axios.post(`${window.apiHost}/users/register/`, {username, accountType})
    .then(response =>{
        console.log(response)
        dispatch({
            type : REGISTER_SUCCESS,
            userData : response.data
        })
    })
    .catch(err => {
        console.log(err)
        dispatch({
            type : REGISTER_ERROR,
            errorData : err
        })
    });

};