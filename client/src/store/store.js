import {createStore, combineReducers, applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import authReducer from "../reducers/authReducer/authReducer";

const rootReducer = combineReducers({
    auth : authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;