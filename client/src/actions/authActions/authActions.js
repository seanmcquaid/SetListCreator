import axios from "axios";
import {
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_ERROR
} from "./authActionTypes";

export const loginAction = () => async dispatch => {

    dispatch({
        type : LOGIN_LOADING
    });

    axios.post("url", "token here")
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