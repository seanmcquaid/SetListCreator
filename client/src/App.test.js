import React from "react";
import App from "./App";
import configureStore from "store/configureStore";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import axios from "axios";

describe("App", () => {
    test("Check Token Action sets user info when provided valid token", () => {
        const store = configureStore();
        
        render(
            <Provider store={store}>
                <App/>
            </Provider>
        );


    }); 

    test("Check Token Action removes user info if there is no valid token", async () => {
        jest.spyOn(axios, "get").mockRejectedValueOnce({response : {data : {errorMessage : "TOKEN ERROR"}}});
        
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