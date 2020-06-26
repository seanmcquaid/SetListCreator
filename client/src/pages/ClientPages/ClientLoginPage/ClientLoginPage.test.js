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
        const initialState = {
            auth : {
                isAuthenticated : false,
            },
            error : {
                errorMessage : null,
            }
        };

        const store = configureStore(initialState);

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/clientLogin">
                    <Route exact path="/clientLogin" component={ClientLoginPage}/>
                    <Route exact path="/clientRegister" component={ClientRegisterPage}/>
                </MockRouter>
            </Provider>
        );

        const getBandleadersResponse = {
            bandleaders : [
                {
                    username : "testbandleader@gmail.com",
                }
            ],
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : { ...getBandleadersResponse}});

        expect(screen.getByText("Client Login")).toBeInTheDocument();

        fireEvent.click(screen.getByText("Here"));

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull())

        expect(screen.getByText("Client Register")).toBeInTheDocument();
    });
    
    test("User successfully logs in and is redirected to client home", () => {
        const initialState = {
            auth : {
                isAuthenticated : false,
            },
            error : {
                errorMessage : null,
            }
        };

        const store = configureStore(initialState);

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/clientLogin">
                    <Route exact path="/clientLogin" component={ClientLoginPage}/>
                    <Route exact path="/clientRegister" component={ClientRegisterPage}/>
                </MockRouter>
            </Provider>
        );
    });

    test("Error message displays when user doesn't log in successfully", () => {
        const initialState = {
            auth : {
                isAuthenticated : false,
            },
            error : {
                errorMessage : null,
            }
        };

        const store = configureStore(initialState);

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/clientLogin">
                    <Route exact path="/clientLogin" component={ClientLoginPage}/>
                    <Route exact path="/clientRegister" component={ClientRegisterPage}/>
                </MockRouter>
            </Provider>
        );
    });
});