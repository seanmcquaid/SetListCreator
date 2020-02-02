import {createStore, combineReducers, applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import authReducer from "reducers/authReducer/authReducer";
import bandLeaderReducer from "reducers/bandLeaderReducer/bandLeaderReducer";
import clientReducer from "reducers/clientReducer/clientReducer";
import errorReducer from "reducers/errorReducer/errorReducer";

const rootReducer = combineReducers({
    auth : authReducer,
    bandLeader : bandLeaderReducer,
    client : clientReducer,
    error : errorReducer,
});

const middleware = applyMiddleware(ReduxThunk);
const createStoreWithMiddleware = middleware(createStore);

export const store = createStoreWithMiddleware(rootReducer);