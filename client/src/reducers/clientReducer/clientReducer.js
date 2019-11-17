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
        default:
            return {
                ...state
            }
    }
}

export default clientReducer;