import React from "react";
import ProtectedBandleaderRoute from "./ProtectedBandleaderRoute";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import MockRouter from "testUtils/MockRouter";
import { Route } from "react-router-dom";
import LandingPage from "pages/LandingPage/LandingPage";
import BandleaderHomePage from "pages/BandleaderPages/BandleaderHomePage/BandleaderHomePage";
import { act } from "react-dom/test-utils";
import configureStore from "store/configureStore";

describe("<ProtectedBandleaderRoute/>", () => {
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
                <MockRouter initialRoute="/bandleaderHome">
                    <Route exact path="/" component={LandingPage}/>
                    <ProtectedBandleaderRoute exact path="/bandleaderHome" component={BandleaderHomePage}/>
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
                accountType : "bandleader",
            },
        };

        const store = configureStore(initialState);

        const {getByText, queryByTestId, getByTestId} = render(
            <Provider store={store}>
                <MockRouter initialRoute="/bandleaderHome">
                    <Route exact path="/" component={LandingPage}/>
                    <ProtectedBandleaderRoute exact path="/bandleaderHome" component={BandleaderHomePage}/>
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

    test("Redirects to home page if the user doesn't have an account type of bandleader", () => {
        jest.useFakeTimers();

        const initialState = {
            auth : {
                isAuthenticated : true,
                accountType : "client",
            },
        };

        const store = configureStore(initialState);

        const {getByText, queryByTestId, getByTestId} = render(
            <Provider store={store}>
                <MockRouter initialRoute="/bandleaderHome">
                    <Route exact path="/" component={LandingPage}/>
                    <ProtectedBandleaderRoute exact path="/bandleaderHome" component={BandleaderHomePage}/>
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
                accountType : "bandleader",
            },
        };

        const store = configureStore(initialState);

        const {getByText, queryByTestId, getByTestId} = render(
            <Provider store={store}>
                <MockRouter initialRoute="/bandleaderHome">
                    <Route exact path="/" component={LandingPage}/>
                    <ProtectedBandleaderRoute exact path="/bandleaderHome" component={BandleaderHomePage}/>
                </MockRouter>
            </Provider>
        );
        
        expect(getByTestId("loadingSpinner")).toBeInTheDocument();

        act(() => {
            jest.runAllTimers();
        });

        expect(queryByTestId("loadingSpinner")).toBeNull();

        expect(getByText("Band Leader Home Page")).toBeInTheDocument();
    });
});