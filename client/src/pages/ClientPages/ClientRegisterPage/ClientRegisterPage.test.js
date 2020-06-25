import React from "react";
import configureStore from "store/configureStore";
import axios from "axios";
import { Provider } from "react-redux";
import { render, waitFor, fireEvent, screen} from "@testing-library/react";
import MockRouter from "testUtils/MockRouter";
import { Route } from "react-router-dom";
import ClientRegisterPage from "./ClientRegisterPage";
import ClientLoginPage from "../ClientLoginPage/ClientLoginPage";
import ClientHomePage from "../ClientHomePage/ClientHomePage";

describe("<ClientRegisterPage/>", () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test("Loading Spinner appears when you first enter the page", async () => {
        const getBandleadersResponse = {
            bandleaders : [
                {
                    username : "testbandleader@gmail.com",
                }
            ],
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : { ...getBandleadersResponse}});

        const initialState = {
            auth : {
                isAuthenticated : false,
            },
            error : {
                errorMessage : "",
            },
        };

        const store = configureStore(initialState);

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/clientRegister">
                    <Route exact path="/clientLogin" component={ClientLoginPage}/>
                    <Route exact path="/clientRegister" component={ClientRegisterPage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        expect(screen.queryByTestId("loadingSpinner")).toBeNull();

    });
    test("Login link takes you to client login page", async () => {
        const getBandleadersResponse = {
            bandleaders : [
                {
                    username : "testbandleader@gmail.com",
                }
            ],
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : { ...getBandleadersResponse}});

        const initialState = {
            auth : {
                isAuthenticated : false,
            },
            error : {
                errorMessage : "",
            },
        };

        const store = configureStore(initialState);

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/clientRegister">
                    <Route exact path="/clientLogin" component={ClientLoginPage}/>
                    <Route exact path="/clientRegister" component={ClientRegisterPage}/>
                </MockRouter>
            </Provider>
        );

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        expect(screen.getByText("Client Register")).toBeInTheDocument();
        
        fireEvent.click(screen.getByText("Here"));

        expect(() => screen.getByText("Client Register")).toThrowError();

        expect(screen.getByText("Client Login")).toBeInTheDocument();
        
    });
    
    test("Successfully register user - redirected to client home", async () => {
        const getBandleadersResponse = {
            bandleaders : [
                {
                    username : "testbandleader@gmail.com",
                }
            ],
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : { ...getBandleadersResponse}});

        const username = "testuser@gmail.com";
        const password = "testpassword";
        const accountType = "client";
        const selectedBandleader = "testbandleader@gmail.com";

        const registerActionResponse = {
            isAuthenticated : true,
            token : "test token",
            username,
            accountType,
            setListAvailable : false,
            selectedBandleader,
        };

        jest.spyOn(axios, "post").mockResolvedValueOnce({data : {...registerActionResponse}});

        const initialState = {
            auth : {
                isAuthenticated : false,
            },
            error : {
                errorMessage : "",
            },
        };

        const store = configureStore(initialState);

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/clientRegister">
                    <Route exact path="/clientHome" component={ClientHomePage}/>
                    <Route exact path="/clientRegister" component={ClientRegisterPage}/>
                </MockRouter>
            </Provider>
        );

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        fireEvent.change(screen.getByTestId("UsernameTextInput"), {target : {value : username}});
        expect(screen.getByTestId("UsernameTextInput").value).toEqual(username);

        fireEvent.change(screen.getByTestId("PasswordTextInput"), {target : {value : password}});
        expect(screen.getByTestId("PasswordTextInput").value).toEqual(password);

        fireEvent.change(screen.getByTestId("Confirm PasswordTextInput"), {target : {value : password}});
        expect(screen.getByTestId("Confirm PasswordTextInput").value).toEqual(password);
        
        fireEvent.change(screen.getByTestId("Select Your BandleaderDropdown"), {target : {value : selectedBandleader}});
        expect(screen.getByTestId("Select Your BandleaderDropdown").value).toEqual(selectedBandleader);

        const getClientSongsResponse = {
            bandleader : "",
            doNotPlaySongsList : [],
            requestedSongsList : [],
            isLoading : true,
            setListAvailable : false,
            clientApproved : false
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getClientSongsResponse}});
        
        fireEvent.click(screen.getByText("Register"));

        await waitFor(() => expect(screen.getByText("Musical Preferences Page")).toBeInTheDocument());

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