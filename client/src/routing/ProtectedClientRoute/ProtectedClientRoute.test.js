import React from "react";
import ProtectedClientRoute from "./ProtectedClientRoute";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import MockRouter from "testUtils/MockRouter";
import { Route } from "react-router-dom";
import LandingPage from "pages/LandingPage/LandingPage";
import ClientHomePage from "pages/ClientPages/ClientHomePage/ClientHomePage";
import { act } from "react-dom/test-utils";
import configureStore from "store/configureStore";

describe("<ProtectedClientRoute/>", () => {
    test("Loading Spinner displays initially and disappears after timer", async () => {
        jest.useFakeTimers();

        const initialState = {
            auth : {
                isAuthenticated : false,
                accountType : "bandleader",
            },
        };

        const store = configureStore(initialState);

        const {getByTestId, queryByTestId} = render(
            <Provider store={store}>
                <MockRouter initialRoute="/clientHome">
                    <Route exact path="/" component={LandingPage}/>
                    <ProtectedClientRoute exact path="/clientHome" component={ClientHomePage}/>
                </MockRouter>
            </Provider>
        );

        expect(getByTestId("loadingSpinner")).toBeInTheDocument();

        act(() => {
            jest.runAllTimers();
        });

        expect(queryByTestId("loadingSpinner")).toBeNull();
    });

    test("Redirects to home page if not authenticated", async () => {
        jest.useFakeTimers();

        const initialState = {
            auth : {
                isAuthenticated : false,
                accountType : "client",
            },
        };

        const store = configureStore(initialState);

        const {getByText, queryByTestId, getByTestId} = render(
            <Provider store={store}>
                <MockRouter initialRoute="/clientHome">
                    <Route exact path="/" component={LandingPage}/>
                    <ProtectedClientRoute exact path="/clientHome" component={ClientHomePage}/>
                </MockRouter>
            </Provider>
        );

        expect(getByTestId("loadingSpinner")).toBeInTheDocument();

        act(() => {
            jest.runAllTimers();
        });

        expect(queryByTestId("loadingSpinner")).toBeNull();

        expect(getByText("Set List Creator")).toBeInTheDocument();

    });

    test("Redirects to home page if the user doesn't have an account type of client", () => {
        jest.useFakeTimers();

        const initialState = {
            auth : {
                isAuthenticated : true,
                accountType : "bandleader",
            },
        };

        const store = configureStore(initialState);

        const {getByText, queryByTestId, getByTestId} = render(
            <Provider store={store}>
                <MockRouter initialRoute="/clientHome">
                    <Route exact path="/" component={LandingPage}/>
                    <ProtectedClientRoute exact path="/clientHome" component={ClientHomePage}/>
                </MockRouter>
            </Provider>
        );

        expect(getByTestId("loadingSpinner")).toBeInTheDocument();

        act(() => {
            jest.runAllTimers();
        });

        expect(queryByTestId("loadingSpinner")).toBeNull();

        expect(getByText("Set List Creator")).toBeInTheDocument();
    });

    test("Returns component when user is authenticated and has account type of client", async () => {
        jest.useFakeTimers();

        const initialState = {
            auth : {
                isAuthenticated : true,
                accountType : "client",
            },
            client : {
                doNotPlaySongsList : [],
                requestedSongsList : [],
                setListAvailable : false,
                clientApproved : false
            }
        };

        const store = configureStore(initialState);

        const {getByText, queryByTestId, getByTestId} = render(
            <Provider store={store}>
                <MockRouter initialRoute="/clientHome">
                    <Route exact path="/" component={LandingPage}/>
                    <ProtectedClientRoute exact path="/clientHome" component={ClientHomePage}/>
                </MockRouter>
            </Provider>
        );
        
        expect(getByTestId("loadingSpinner")).toBeInTheDocument();

        act(() => {
            jest.runAllTimers();
        });

        expect(queryByTestId("loadingSpinner")).toBeNull();

        expect(getByText("Musical Preferences Page")).toBeInTheDocument();
    });
});