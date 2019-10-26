import {
    REGISTER_LOADING,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGIN_LOADING,
    LOGOUT_LOADING,
    LOGOUT_SUCCESS
} from "../../actions/authActions/authActionTypes";

const initialState = {
    isAuthenticated : false,
    token : null,
    username : null,
    accountType : null,
    errorData : {
        status : null,
        errorMessage : null
    },
    isLoading : false,
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case REGISTER_LOADING: case LOGIN_LOADING: case LOGOUT_LOADING:
            return {
                ...state,
                isLoading : true
            }
        case REGISTER_SUCCESS: case LOGIN_SUCCESS:
            localStorage.setItem("token", action.userData.token);
            return{
                ...state,
                isAuthenticated : action.userData.isAuthenticated,
                token : action.userData.token,
                username : action.userData.username,
                accountType : action.userData.accountType,
                isLoading : false,
            }
        case REGISTER_ERROR: case LOGIN_ERROR:
            return {
                ...state,
                errorData : {
                    status : action.errorData.status,
                    errorMessage : action.errorData.data.errorMessage
                },
                isLoading : false,
            }
        case LOGOUT_SUCCESS:
            return {
                ...initialState
            }
        default :
            return {
                ...state
            }
    }
}

export default authReducer;