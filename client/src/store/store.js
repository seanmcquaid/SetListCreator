import {createStore, combineReducers, applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import authReducer from "../reducers/authReducer/authReducer";
import bandLeaderReducer from "../reducers/bandLeaderReducer/bandLeaderReducer";
import clientReducer from "../reducers/clientReducer/clientReducer";

const rootReducer = combineReducers({
    auth : authReducer,
    bandLeader : bandLeaderReducer,
    client : clientReducer,
});

const middleware = applyMiddleware(ReduxThunk);
const createStoreWithMiddleware = middleware(createStore);

export const store = createStoreWithMiddleware(rootReducer);