import React from "react";
import BandleaderProfilePage from "./BandleaderProfilePage";
import configureStore from "store/configureStore";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import MockRouter from "testUtils/MockRouter";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import axios from "axios";
import BandleaderHomePage from "../BandleaderHomePage/BandleaderHomePage";

describe("<BandleaderProfilePage/>", () => {

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

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());
    });

    test("User Info loads correctly", async () => {
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

        expect(screen.getByTestId("Edit Username HereTextInput").value).toEqual("test user");
    });

    test("User info loads incorrectly - error", async () => {
        const getUserInfoActionResponse = {
            errorMessage : "There was an issue getting the user info",
        };

        jest.spyOn(axios, "get").mockRejectedValueOnce({response : {data : {...getUserInfoActionResponse,}}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/bandleader/editProfile">
                    <Route exact path="/bandleader/editProfile" component={BandleaderProfilePage}/>
                </MockRouter>
            </Provider>
        );

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        expect(screen.getByText("There was an issue getting the user info")).toBeInTheDocument();
    });

    test("Successful edit user info", async () => {
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
                    <Route exact path="/bandleaderHome" component={BandleaderHomePage}/>
                </MockRouter>
            </Provider>
        );

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        const editUserInfoActionResponse = { 
            isAuthenticated : true,
            token : "testToken",
            username : "test user changed",
            accountType : "bandleader",
        }

        jest.spyOn(axios, "patch").mockResolvedValueOnce({data : { ...editUserInfoActionResponse}});

        fireEvent.change(screen.getByTestId("Edit Username HereTextInput"), {target : { value : "test user changed"}})
        expect(screen.getByTestId("Edit Username HereTextInput").value).toEqual("test user changed");

        fireEvent.change(screen.getByTestId("Edit New Password HereTextInput"), {target : { value : "new password"}});
        expect(screen.getByTestId("Edit New Password HereTextInput").value).toEqual("new password");

        fireEvent.change(screen.getByTestId("Confirm New Password HereTextInput"), {target : { value : "new password"}});
        expect(screen.getByTestId("Confirm New Password HereTextInput").value).toEqual("new password");

        fireEvent.click(screen.getByTestId("Edit ProfileButton"));

        await waitFor(() => expect(screen.getByText("Band Leader Home Page")).toBeInTheDocument());
    });

    test("Passwords not matching", () => {

    });
});