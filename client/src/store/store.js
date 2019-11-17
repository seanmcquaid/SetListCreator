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
const createStoreWithPersistentState = middleware(createStore);

const loadFromLocalStorage = () => {
    try{
        const serializedState = localStorage.getItem("state");
        if(serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch(err){
        console.log(err);
    }
};

export const saveToLocalStorage = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch(err){
        console.log(err)
    }
};

const persistentState = loadFromLocalStorage();

export const store = createStoreWithPersistentState(rootReducer, persistentState);