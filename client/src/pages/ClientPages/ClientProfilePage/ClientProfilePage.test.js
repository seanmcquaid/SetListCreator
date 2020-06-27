import React from "react";
import ClientProfilePage from "./ClientProfilePage";
import axios from "axios";
import { screen, waitFor, render, fireEvent } from "@testing-library/react";
import configureStore from "store/configureStore";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import MockRouter from "testUtils/MockRouter";
import ClientHomePage from "../ClientHomePage/ClientHomePage";

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

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : { ...getUserInfoActionResponse}});

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

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : { ...getUserInfoActionResponse}});

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

    test("Error when trying to get user info", async () => {
        const getUserInfoActionResponse = {
            errorMessage : "There was an issue getting the user info",
        };

        jest.spyOn(axios, "get").mockRejectedValueOnce({
            response : {
                data : {
                    ...getUserInfoActionResponse,
                }
            }
        });

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

        expect(screen.getByText("There was an issue getting the user info")).toBeInTheDocument();
    });

    test("Update user name and password success", async () => {
        const getUserInfoActionResponse = {
            isAuthenticated : true,
            token : "testToken",
            username : "test user",
            accountType : "client",
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : { ...getUserInfoActionResponse}});

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
                    <Route exact path="/clientHome" component={ClientHomePage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        const editUserInfoActionResponse = { 
            isAuthenticated : true,
            token : "testToken",
            username : "test user changed",
            accountType : "client",
        }

        jest.spyOn(axios, "patch").mockResolvedValueOnce({data : { ...editUserInfoActionResponse}});

        fireEvent.change(screen.getByTestId("Edit New Password HereTextInput"), {target : { value : "new password"}});

        fireEvent.change(screen.getByTestId("Confirm New Password HereTextInput"), {target : { value : "new password"}});

        const getClientSongsActionResponse = {
            bandleader : "",
            doNotPlaySongsList : [],
            requestedSongsList : [],
            isLoading : true,
            setListAvailable : false,
            clientApproved : false
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getClientSongsActionResponse}});

        fireEvent.click(screen.getByTestId("Edit ProfileButton"));

        await waitFor(() => expect(screen.getByText("Musical Preferences Page")).toBeInTheDocument());

        
    });

    test("Update user name and password failure - passwords don't match", async () => {
        const getUserInfoActionResponse = {
            isAuthenticated : true,
            token : "testToken",
            username : "test user",
            accountType : "client",
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : { ...getUserInfoActionResponse}});

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
                    <Route exact path="/clientHome" component={ClientHomePage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        const editUserInfoActionResponse = { 
            isAuthenticated : true,
            token : "testToken",
            username : "test user changed",
            accountType : "client",
        }

        jest.spyOn(axios, "patch").mockResolvedValueOnce({data : { ...editUserInfoActionResponse}});

        fireEvent.change(screen.getByTestId("Edit New Password HereTextInput"), {target : { value : "new password"}});

        fireEvent.change(screen.getByTestId("Confirm New Password HereTextInput"), {target : { value : "new password not here"}});

        fireEvent.click(screen.getByTestId("Edit ProfileButton"));

        expect(screen.getByText("ERROR WITH PASSWORDS NOT MATCHING")).toBeInTheDocument();

    });


});