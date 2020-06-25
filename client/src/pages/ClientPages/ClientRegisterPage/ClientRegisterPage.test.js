import React from "react";
import configureStore from "store/configureStore";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import {apiHost} from "config";
import { Provider } from "react-redux";
import { render, waitFor, fireEvent, screen, waitForElementToBeRemoved, waitForDomChange, waitForElement} from "@testing-library/react";
import MockRouter from "testUtils/MockRouter";
import { Route } from "react-router-dom";
import ClientRegisterPage from "./ClientRegisterPage";
import ClientLoginPage from "../ClientLoginPage/ClientLoginPage";
import { act } from "react-dom/test-utils";

describe("<ClientRegisterPage/>", () => {
    const mockAxios = new AxiosMockAdapter(axios, {delayResponse : Math.random() * 10});

    const getBandleadersResponse = {
        bandleaders : [
            {
                username : "testbandleader@gmail.com",
            }
        ],
    };

    mockAxios.onGet(`${apiHost}/users/getBandleaders`).reply(200, getBandleadersResponse);

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test("Loading Spinner appears when you first enter the page", async () => {
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

        const username = "testuser@gmail.com";
        const password = "testpassword";
        const accountType = "client";
        const selectedBandleader = "testbandleader@gmail.com";

        const payload = {
            isAuthenticated : true,
            token : "test token",
            username : "testuser@gmail.com",
            accountType : "client",
            setListAvailable : false,
            selectedBandleader : "testbandleader@gmail.com",
        };

        mockAxios.onPost(`${apiHost}/users/login/${accountType}`).reply(200, payload);

        const spy = jest.spyOn(axios, "post");

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

        fireEvent.change(screen.getByTestId("UsernameTextInput"), {target : {value : username}});
        expect(screen.getByTestId("UsernameTextInput").value).toEqual(username);

        fireEvent.change(screen.getByTestId("PasswordTextInput"), {target : {value : password}});
        expect(screen.getByTestId("PasswordTextInput").value).toEqual(password);

        fireEvent.change(screen.getByTestId("Confirm PasswordTextInput"), {target : {value : password}});
        expect(screen.getByTestId("Confirm PasswordTextInput").value).toEqual(password);
        
        fireEvent.change(screen.getByTestId("Select Your BandleaderDropdown"), {target : {value : selectedBandleader}});
        expect(screen.getByTestId("Select Your BandleaderDropdown").value).toEqual(selectedBandleader);
        
        fireEvent.click(screen.getByText("Register"));

        await waitFor(() => expect(spy).toHaveBeenCalled());

        await waitFor(() => expect(screen.queryByText("Musical Preferences Page")).toBeInTheDocument());

        console.log(store.getState());

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