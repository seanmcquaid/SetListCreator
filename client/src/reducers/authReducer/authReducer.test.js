import {
    REGISTER_LOADING,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGIN_LOADING,
    LOGOUT_LOADING,
    LOGOUT_SUCCESS,
    CHECK_TOKEN_LOADING,
    CHECK_TOKEN_SUCCESS,
    CHECK_TOKEN_ERROR,
    EDIT_USER_INFO_LOADING,
    EDIT_USER_INFO_SUCCESS,
    EDIT_USER_INFO_ERROR,
    GET_USER_INFO_LOADING,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_ERROR,
} from "actions/authActions/authActionTypes";
import authReducer from "./authReducer";

const initialState = {
    isAuthenticated : false,
    token : localStorage.getItem("token"),
    username : "",
    accountType : "",
    isLoading : false,
};

describe("authReducer", () => {

    describe("LOADING", () => {
        test("REGISTER_LOADING",  () => {
            const action = {
                type : REGISTER_LOADING,
                payload : {
                    ...initialState
                }
            }
    
            const expectedResult = { 
                isAuthenticated: false,
                token: null,
                username: "",
                accountType: "",
                isLoading: true 
            };
    
            expect(authReducer(initialState, action)).toEqual(expectedResult);
        });

        test("LOGIN_LOADING",  () => {
            const action = {
                type : LOGIN_LOADING,
                payload : {
                    ...initialState
                }
            }
    
            const expectedResult = { 
                isAuthenticated: false,
                token: null,
                username: "",
                accountType: "",
                isLoading: true 
            };
    
            expect(authReducer(initialState, action)).toEqual(expectedResult);
        });

        test("LOGOUT_LOADING",  () => {
            const action = {
                type : LOGOUT_LOADING,
                payload : {
                    ...initialState
                }
            }
    
            const expectedResult = { 
                isAuthenticated: false,
                token: null,
                username: "",
                accountType: "",
                isLoading: true 
            };
    
            expect(authReducer(initialState, action)).toEqual(expectedResult);
        });

        test("CHECK_TOKEN_LOADING",  () => {
            const action = {
                type : CHECK_TOKEN_LOADING,
                payload : {
                    ...initialState
                }
            }
    
            const expectedResult = { 
                isAuthenticated: false,
                token: null,
                username: "",
                accountType: "",
                isLoading: true 
            };
    
            expect(authReducer(initialState, action)).toEqual(expectedResult);
        });

        test("EDIT_USER_INFO_LOADING",  () => {
            const action = {
                type : EDIT_USER_INFO_LOADING,
                payload : {
                    ...initialState
                }
            }
    
            const expectedResult = { 
                isAuthenticated: false,
                token: null,
                username: "",
                accountType: "",
                isLoading: true 
            };
    
            expect(authReducer(initialState, action)).toEqual(expectedResult);
        });

        test("GET_USER_INFO_LOADING",  () => {
            const action = {
                type : GET_USER_INFO_LOADING,
                payload : {
                    ...initialState
                }
            }
    
            const expectedResult = { 
                isAuthenticated: false,
                token: null,
                username: "",
                accountType: "",
                isLoading: true 
            };
    
            expect(authReducer(initialState, action)).toEqual(expectedResult);
        });    
    });

});