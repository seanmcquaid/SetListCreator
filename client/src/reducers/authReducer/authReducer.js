import {
    REGISTER_LOADING,
    REGISTER_SUCCESS,
    REGISTER_ERROR
} from "../../actions/authActions/authActionTypes";

const initialState = {
    isAuthenticated : false,
    token : null,
    username : "",
    errorData : {
        status : "",
        errorMessage : ""
    },
    isLoading : false,
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case REGISTER_LOADING:
            return {
                ...state,
                isLoading : true
            }
        case REGISTER_SUCCESS:
            localStorage.setItem("token", action.userData.token);
            return{
                ...state,
                isAuthenticated : action.userData.isAuthenticated,
                token : action.userData.token,
                username : action.userData.username,
                isLoading : false,
            }
        case REGISTER_ERROR:
            return {
                ...state,
                errorData : {
                    status : action.errorData.status,
                    errorMessage : action.errorData.data.errorMessage
                },
                isLoading : false,
            }
        default :
            return state
    }
}

export default authReducer;