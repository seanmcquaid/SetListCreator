import React from "react";
import {Provider} from "react-redux";
import {createStore, combineReducers, applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";

// reducers must be an an object with appropriate key value pairs
// you must set up the initial state for the reducers by itself

// example reducer set up

// const initialState = {
//     isAuthenticated : true,
//     token : localStorage.getItem("token"),
//     username : "",
//     accountType : "",
//     isLoading : false,
// };

// authReducer(initialState, {type : ""});



const MockProvider = ({reducers, children}) => {
    const rootReducer = combineReducers(reducers);
    const middleware = applyMiddleware(ReduxThunk);
    const createStoreWithMiddleware = middleware(createStore);
    const store = createStoreWithMiddleware(rootReducer);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
};

export default MockProvider;