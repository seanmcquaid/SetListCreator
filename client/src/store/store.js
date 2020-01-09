import {createStore, combineReducers, applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import authReducer from "reducers/authReducer";
import bandLeaderReducer from "reducers/bandLeaderReducer";
import clientReducer from "reducers/clientReducer";
import errorReducer from "reducers/errorReducer";

const rootReducer = combineReducers({
    auth : authReducer,
    bandLeader : bandLeaderReducer,
    client : clientReducer,
    error : errorReducer,
});

const middleware = applyMiddleware(ReduxThunk);
const createStoreWithMiddleware = middleware(createStore);

export const store = createStoreWithMiddleware(rootReducer);