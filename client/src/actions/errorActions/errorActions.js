import {CLEAR_ERROR_MESSAGE} from "./errorActionTypes";

export const clearErrorMessage = () => dispatch => {
    dispatch({
        type : CLEAR_ERROR_MESSAGE,
    });
};