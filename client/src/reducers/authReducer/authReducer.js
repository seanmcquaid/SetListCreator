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
    CHECK_TOKEN_FAILURE
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
        case REGISTER_LOADING: case LOGIN_LOADING: case LOGOUT_LOADING: case CHECK_TOKEN_LOADING:
            return {
                ...state,
                isLoading : true
            }
        case REGISTER_SUCCESS: case LOGIN_SUCCESS: case CHECK_TOKEN_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return{
                ...state,
                isAuthenticated : action.payload.isAuthenticated,
                token : action.payload.token,
                username : action.payload.username,
                accountType : action.payload.accountType,
                isLoading : false,
            }
        case REGISTER_ERROR: case LOGIN_ERROR:
            localStorage.removeItem("token");
            return {
                ...state,
                errorData : {
                    status : action.payload.status,
                    errorMessage : action.payload.data.errorMessage
                },
                isLoading : false,
            }
        case LOGOUT_SUCCESS:
            localStorage.removeItem("token");
            return {
                ...initialState,
            }
        case CHECK_TOKEN_FAILURE:
            localStorage.removeItem("token");
            console.log(action.payload)
            return {
                ...initialState,
                errorData : {
                    status : action.payload.status,
                    errorMessage : action.payload.data.errorMessage
                }
            }
        default :
            return {
                ...state
            }
    }
}

export default authReducer;