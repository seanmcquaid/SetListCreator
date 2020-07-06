import React from "react";
import App from "./App";
import configureStore from "store/configureStore";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import axios from "axios";

describe("App", () => {

    describe("Token is set up", () => {
        test("Check Token Action sets user info when provided valid token", () => {
            const store = configureStore();
            
            render(
                <Provider store={store}>
                    <App/>
                </Provider>
            );
    
    
        }); 
    });

    test("Check Token Action removes user info if there is no valid token", () => {
        const store = configureStore();
        
        render(
            <Provider store={store}>
                <App/>
            </Provider>
        );
    });
})