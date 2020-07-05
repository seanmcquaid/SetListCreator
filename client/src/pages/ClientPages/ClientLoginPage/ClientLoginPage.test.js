import React from "react";
import ClientLoginPage from "./ClientLoginPage";
import ClientRegisterPage from "pages/ClientPages/ClientRegisterPage/ClientRegisterPage";
import ClientHomePage from "pages/ClientPages/ClientHomePage/ClientHomePage";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "store/configureStore";
import MockRouter from "testUtils/MockRouter";
import { Route } from "react-router-dom";
import axios from "axios";

describe("<ClientLoginPage/>", () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test("Register link takes user to client register page", async () => {
        const getBandleadersResponse = {
            bandleaders : [
                {
                    username : "testbandleader@gmail.com",
                }
            ],
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : { ...getBandleadersResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/clientLogin">
                    <Route exact path="/clientLogin" component={ClientLoginPage}/>
                    <Route exact path="/clientRegister" component={ClientRegisterPage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByText("Client Login")).toBeInTheDocument();

        fireEvent.click(screen.getByText("Here"));

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull())

        expect(screen.getByText("Client Register")).toBeInTheDocument();
    });
    
    test("User successfully logs in and is redirected to client home", async () => {

        const username = "testuser@gmail.com";
        const password = "testpassword";

        const loginActionResponse = {
            isAuthenticated : true,
            token : "testToken",
            username,
            accountType : "client",
            isLoading: false,
        };

        jest.spyOn(axios, "post").mockResolvedValueOnce({ data : {...loginActionResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/clientLogin">
                    <Route exact path="/clientLogin" component={ClientLoginPage}/>
                    <Route exact path="/clientHome" component={ClientHomePage}/>
                </MockRouter>
            </Provider>
        );

        fireEvent.change(screen.getByTestId("UsernameTextInput"), {target : {value : username}});
        expect(screen.getByTestId("UsernameTextInput").value).toEqual(username);

        fireEvent.change(screen.getByTestId("PasswordTextInput"), {target : {value : password}});
        expect(screen.getByTestId("PasswordTextInput").value).toEqual(password);

        const getClientSongsActionResponse = {
            bandleader : "",
            doNotPlaySongsList : [],
            requestedSongsList : [],
            isLoading : true,
            setListAvailable : false,
            clientApproved : false
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getClientSongsActionResponse}});

        fireEvent.click(screen.getByText("Login"));

        await waitFor(() => expect(screen.getByText("Musical Preferences Page")).toBeInTheDocument());

    });

    test("Error message displays when user doesn't log in successfully", async () => {
        const username = "testuser@gmail.com";
        const password = "testpassword";

        const loginActionResponse = {
            errorMessage : "Error Here",
        };

        jest.spyOn(axios, "post").mockRejectedValueOnce({ 
            response : {
                data : {...loginActionResponse}
            }
        });

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/clientLogin">
                    <Route exact path="/clientLogin" component={ClientLoginPage}/>
                    <Route exact path="/clientHome" component={ClientHomePage}/>
                </MockRouter>
            </Provider>
        );

        fireEvent.change(screen.getByTestId("UsernameTextInput"), {target : {value : username}});
        expect(screen.getByTestId("UsernameTextInput").value).toEqual(username);

        fireEvent.change(screen.getByTestId("PasswordTextInput"), {target : {value : password}});
        expect(screen.getByTestId("PasswordTextInput").value).toEqual(password);

        fireEvent.click(screen.getByText("Login"));

        await waitFor(() => expect(screen.getByText("Error Here")).toBeInTheDocument());
    });
});