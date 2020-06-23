import React from "react";
import configureStore from "store/configureStore";

describe("<ClientRegisterPage/>", () => {
    // Mock Axios for bandleaders call

    test("Login link takes you to client login page", () => {

    });
    
    test("Successfully register user - redirected to client home", () => {
        const initialState = {

        };

        const store = configureStore(initialState);

    });

    describe("Unsucessfully register user", () => {
        test("Passwords don't match", () => {
            
        });
    
        test("Bandleader not selected", () => {
    
        });

        test("User already is registered", () => {

        });
    });
});