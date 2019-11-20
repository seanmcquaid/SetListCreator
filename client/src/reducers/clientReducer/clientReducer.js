import { LOGOUT_SUCCESS } from "../../actions/authActions/authActionTypes";

const initialState = {
    bandLeader : "",
    doNotPlayList : [],
    requestedSongsList : [],
    isLoading : false,
    errorData : {
        status : null,
        errorMessage : null,
    }
}

const clientReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGOUT_SUCCESS :
            return {
                ...initialState
            }
        default:
            return {
                ...state
            }
    }
}

export default clientReducer;