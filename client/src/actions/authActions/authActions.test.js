import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import {apiHost} from "config";
import {loginAction} from "./authActions";
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

describe("authActions", () => {
    const mockAxios = new AxiosMockAdapter(axios, {delayResponse : Math.random() * 10});

    const middleware = [ReduxThunk];
    const mockStore = configureMockStore(middleware);

    const store = mockStore();

    describe("loginAction", () => {

        afterEach(() => {
            store.clearActions();
        });
        test("loginAction - success", () => {
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
    
});