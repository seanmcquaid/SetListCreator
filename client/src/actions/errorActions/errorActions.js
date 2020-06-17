import {CLEAR_ERROR_MESSAGE} from "./errorActionTypes";

export const clearErrorMessageAction = () => dispatch => {
    dispatch({
        type : CLEAR_ERROR_MESSAGE,
    });
};