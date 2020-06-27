import React from "react";
import ClientProfilePage from "./ClientProfilePage";
import axios from "axios";
import { screen, waitFor, render } from "@testing-library/react";
import configureStore from "store/configureStore";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import MockRouter from "testUtils/MockRouter";

describe("<ClientProfilePage/>", () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });
    test("Loading Spinner", async () => {

        const getUserInfoActionResponse = {
            isAuthenticated : true,
            token : "testToken",
            username : "test user",
            accountType : "client",
        };

        jest.spyOn(axios, "get").mockResolvedValue({data : { ...getUserInfoActionResponse}});

        const initialState = {
            auth : {
                username : "test user",
            },
            error : {
                errorMessage : "",
            },
        };

        const store = configureStore(initialState);

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/client/editProfile">
                    <Route exact path="/client/editProfile" component={ClientProfilePage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        expect(screen.queryByTestId("loadingSpinner")).toBeNull();
    });

    test("Username displays after loading", async () => {
        const getUserInfoActionResponse = {
            isAuthenticated : true,
            token : "testToken",
            username : "test user",
            accountType : "client",
        };

        jest.spyOn(axios, "get").mockResolvedValue({data : { ...getUserInfoActionResponse}});

        const initialState = {
            auth : {
                username : "",
                isLoading : false,
            },
            error : {
                errorMessage : "",
            },
        };

        const store = configureStore(initialState);

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/client/editProfile">
                    <Route exact path="/client/editProfile" component={ClientProfilePage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());
        
        expect(screen.getByTestId("Edit Username HereTextInput").value).toEqual("test user");
    });

    test("Error when trying to get user info", () => {

    });

    test("Update user name and password success", () => {

    });

    test("Update user name and password failure - passwords don't match", () => {

    });


});