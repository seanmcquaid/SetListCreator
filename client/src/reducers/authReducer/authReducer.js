const initialState = {
    isAuthenticated : false,
    token : null,
    userInfo : ""
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case "Action Name Here":
            return state
        default :
            return state
    }
}

export default authReducer;