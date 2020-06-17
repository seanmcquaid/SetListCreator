import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import {apiHost} from "config";
import {loginAction, registerAction, logoutAction, tokenConfig} from "./authActions";
import ReduxThunk from "redux-thunk";
import { configureMockStore } from "@jedmao/redux-mock-store";
import {
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    REGISTER_LOADING,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    LOGOUT_LOADING,
    LOGOUT_SUCCESS,
    CHECK_TOKEN_SUCCESS,
    CHECK_TOKEN_LOADING,
    CHECK_TOKEN_ERROR,
    EDIT_USER_INFO_LOADING,
    EDIT_USER_INFO_SUCCESS,
    EDIT_USER_INFO_ERROR,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_ERROR,
    GET_USER_INFO_LOADING
} from "./authActionTypes";
import { store } from "store/store";

describe("authActions", () => {
    const mockAxios = new AxiosMockAdapter(axios, {delayResponse : Math.random() * 10});

    const middleware = [ReduxThunk];
    const mockStore = configureMockStore(middleware);

    describe("loginAction", () => {
        test("loginAction - success", () => {
            const store = mockStore();

            const username = "testuser@gmail.com";
            const password = "testpassword";
            const accountType = "client";

            const payload = {
                isAuthenticated : true,
                token : "test token",
                username : "testuser@gmail.com",
                accountType : "client",
                setListAvailable : false,
                selectedBandleader : "testbandleader@gmail.com",
            };

            mockAxios.onPost(`${apiHost}/users/login/${accountType}`).reply(200, payload);

            const expectedActions = [
                {
                    type : LOGIN_LOADING,
                },
                {
                    type : LOGIN_SUCCESS,
                    payload,
                }
            ];

            return store.dispatch(loginAction(username, password, accountType)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });

        });

        test("loginAction - error", () => {
            const store = mockStore();

            const username = "testuser@gmail.com";
            const password = "testpassword";
            const accountType = "client";
    
            const payload = {
                errorMessage : "error"
            };
    
            mockAxios.onPost(`${apiHost}/users/login/${accountType}`).reply(401, payload);
    
            const expectedActions = [
                {
                    type : LOGIN_LOADING,
                },
                {
                    type : LOGIN_ERROR,
                    payload,
                }
            ];
    
            return store.dispatch(loginAction(username, password, accountType)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

    });

    describe("registerAction", () => {
        test("registerAction - success", () => {
            const store = mockStore();

            const username = "testuser@gmail.com";
            const password = "test123";
            const accountType = "client";
            const selectedBandleader = "testbandleader@gmail.com";

            const payload = {
                isAuthenticated : true,
                token : "test token",
                username : "testuser@gmail.com",
                accountType : "client",
                setListAvailable : false,
                selectedBandleader : "testbandleader@gmail.com",
            };

            mockAxios.onPost(`${apiHost}/users/register/${accountType}`).reply(200, payload);

            const expectedActions = [
                {
                    type : REGISTER_LOADING,
                },
                {
                    type : REGISTER_SUCCESS,
                    payload,
                }
            ];

            return store.dispatch(registerAction(username, password, accountType, selectedBandleader)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        test("registerAction - error", () => {
            const store = mockStore();

            const username = "testuser@gmail.com";
            const password = "test123";
            const accountType = "client";
            const selectedBandleader = "testbandleader@gmail.com";
    
            const payload = {
                errorMessage : "error"
            };
    
            mockAxios.onPost(`${apiHost}/users/register/${accountType}`).reply(401, payload);
    
            const expectedActions = [
                {
                    type : REGISTER_LOADING,
                },
                {
                    type : REGISTER_ERROR,
                    payload,
                }
            ];
    
            return store.dispatch(registerAction(username, password, accountType, selectedBandleader)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });

    test("logoutAction", () => {
        const store = mockStore();

        const expectedActions = [
            {
                type : LOGOUT_LOADING
            },
            {
                type : LOGOUT_SUCCESS
            }
        ];

        return store.dispatch(logoutAction()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe("tokenConfig", () => {
        beforeEach(() => {
            localStorage.setItem("token", "token");
        });

        test("tokenConfig works correctly", () => {
            const expectedResult = { 
                headers: { "Content-Type": "application/json", Authorization: "token" } 
            };

            expect(tokenConfig()).toEqual(expectedResult);
        });

        afterEach(() => {
            localStorage.removeItem("token");
        })
    });
    
});