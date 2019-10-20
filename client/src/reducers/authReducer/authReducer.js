import {
    REGISTER_LOADING,
    REGISTER_SUCCESS,
    REGISTER_ERROR
} from "../../actions/authActions/authActionTypes";

const initialState = {
    isAuthenticated : false,
    token : null,
    userInfo : "",
    errorMessage : "",
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
            return{
                ...state
            }
        case REGISTER_ERROR: 
            return {
                ...state
            }
        default :
            return state
    }
}

export default authReducer;