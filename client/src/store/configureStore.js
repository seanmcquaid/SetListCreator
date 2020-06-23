import {applyMiddleware, compose, createStore, combineReducers} from "redux";
import ReduxThunk from "redux-thunk";
import authReducer from "reducers/authReducer/authReducer";
import bandleaderReducer from "reducers/bandleaderReducer/bandleaderReducer";
import clientReducer from "reducers/clientReducer/clientReducer";
import errorReducer from "reducers/errorReducer/errorReducer";

const rootReducer = combineReducers({
    auth : authReducer,
    bandleader : bandleaderReducer,
    client : clientReducer,
    error : errorReducer,
});

const configureStore = preloadedState => {
    const middlewares = [ReduxThunk];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer];
    const composedEnhancers = compose(...enhancers);

    const store = createStore(rootReducer, preloadedState, composedEnhancers);

    return store;
};

export default configureStore;
