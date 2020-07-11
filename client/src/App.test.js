import React from "react";
import App from "./App";
import configureStore from "store/configureStore";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import axios from "axios";

describe("App", () => {

    afterEach(() => {
        localStorage.removeItem("token");
    });

    test("Check Token Action sets user info when provided valid token", async () => {
        const checkTokenResponse = {
            isAuthenticated : true,
            token : "testToken",
            username : "test user",
            accountType : "client",
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...checkTokenResponse}});

        const initialState = {
            auth : {
                token : "realToken",
            },
        };

        const store = configureStore(initialState);
        
        render(
            <Provider store={store}>
                <App/>
            </Provider>
        );

        const expectedState = {
            isAuthenticated : true,
            token : "testToken",
            username : "test user",
            accountType : "client",
            isLoading : false,
        };

        await waitFor(() => expect(store.getState().auth).toEqual(expectedState));

    }); 

    test("Check Token Action removes user info if there is no valid token", async () => {
        const checkTokenResponse = {
            errorMessage : "TOKEN ERROR",
        };
        jest.spyOn(axios, "get").mockRejectedValueOnce({response : {data : {...checkTokenResponse}}});

        const initialState = {
            auth : {
                isAuthenticated : false,
                token : "fakeToken",
                username : "fake user info",
                accountType : "client",
                isLoading : false,
            },
        };

        const store = configureStore(initialState);
        
        render(
            <Provider store={store}>
                <App/>
            </Provider>
        );

        const expectedState = {
            isAuthenticated : false,
            token : null,
            username : "",
            accountType : "",
            isLoading : false,
        };

        await waitFor(() => expect(store.getState().auth).toEqual(expectedState));
    });
})