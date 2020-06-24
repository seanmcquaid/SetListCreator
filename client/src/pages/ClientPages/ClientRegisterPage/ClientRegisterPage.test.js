import React from "react";
import configureStore from "store/configureStore";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import {apiHost} from "config";
import { Provider } from "react-redux";
import { render, waitFor, fireEvent, getByTestId } from "@testing-library/react";
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
                username : "TestLeader",
            }
        ],
    };

    mockAxios.onGet(`${apiHost}/users/getBandleaders`).reply(200, getBandleadersResponse);

    test("Login link takes you to client login page", async () => {
        jest.useFakeTimers();

        const initialState = {
            auth : {
                isAuthenticated : false,
            },
            error : {
                errorMessage : "",
            },
        };

        const store = configureStore(initialState);

        const {getByText, queryByTestId} = render(
            <Provider store={store}>
                <MockRouter initialRoute="/clientRegister">
                    <Route exact path="/clientLogin" component={ClientLoginPage}/>
                    <Route exact path="/clientRegister" component={ClientRegisterPage}/>
                </MockRouter>
            </Provider>
        );

        await waitFor(() => expect(queryByTestId("loadingSpinner")).toBeNull());

        expect(getByText("Client Register")).toBeInTheDocument();
        
        fireEvent.click(getByText("Here"));

        expect(() => getByText("Client Register")).toThrowError();

        expect(getByText("Client Login")).toBeInTheDocument();
        
    });
    
    test("Successfully register user - redirected to client home", () => {

        const username = "testuser@gmail.com";
        const password = "testpassword";
        const accountType = "client";

        const payload = {
            isAuthenticated : true,
            token : "test token",
            username : "testuser@gmail.com",
            accountType : "client",
            setListAvailable : false,
            selectedBandleader : "testbandleader@gmail.com",
        };

        mockAxios.onPost(`${apiHost}/users/login/${accountType}`).reply(200, payload);
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