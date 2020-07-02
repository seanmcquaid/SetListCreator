import React from "react";
import BandleaderProfilePage from "./BandleaderProfilePage";
import configureStore from "store/configureStore";
import { render, waitFor, screen } from "@testing-library/react";
import MockRouter from "testUtils/MockRouter";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import axios from "axios";

describe("<BandleaderProfilePage/>", () => {

    test("Loading Spinner", async () => {

        const getUserInfoActionResponse = {
            isAuthenticated : true,
            token : "testToken",
            username : "test user",
            accountType : "bandleader",
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : { ...getUserInfoActionResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/bandleader/editProfile">
                    <Route exact path="/bandleader/editProfile" component={BandleaderProfilePage}/>
                </MockRouter>
            </Provider>
        );

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());
    });

    test("User Info loads correctly", () => {

    });

    test("User info loads incorrectly - error", () => {

    });

    test("Successful edit user info", () => {

    });

    test("Passwords not matching", () => {

    });
});