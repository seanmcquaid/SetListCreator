const initialState = {
    setLists : null,
    clientList : null,
    bandLists : null,
    songList : null
}

const bandLeaderReducer = (state = initialState, action) => {
    switch(action.type){
        default :
        return {
            ...state
        }
    }
}

export default bandLeaderReducer;