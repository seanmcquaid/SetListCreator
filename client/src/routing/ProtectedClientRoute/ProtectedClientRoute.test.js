import React from "react";
import ProtectedClientRoute from "./ProtectedClientRoute";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import MockRouter from "testUtils/MockRouter";
import { Route } from "react-router-dom";
import ReduxThunk from "redux-thunk";
import { configureMockStore } from "@jedmao/redux-mock-store";
import LandingPage from "pages/LandingPage/LandingPage";
import ClientHomePage from "pages/ClientPages/ClientHomePage/ClientHomePage";

describe("<ProtectedClientRoute/>", () => {

    const middleware = [ReduxThunk];
    const mockStore = configureMockStore(middleware);
    test("Loading Spinner displays initially", () => {
        const initialState = {
            auth : {
                isAuthenticated : false,
                accountType : "bandleader",
            },
        };

        const store = mockStore(initialState);

        const {getByTestId} = render(
            <Provider store={store}>
                <MockRouter initialRoute="/clientHome">
                    <Route exact path="/" component={LandingPage}/>
                    <ProtectedClientRoute exact path="/clientHome" component={ClientHomePage}/>
                </MockRouter>
            </Provider>
        );

        expect(getByTestId("loadingSpinner")).toBeInTheDocument();
    });

    test("Redirects to home page if not authenticated", async () => {
        const initialState = {
            auth : {
                isAuthenticated : false,
                accountType : "bandleader",
            },
        };

        const store = mockStore(initialState);

        const {} = render(
            <Provider store={store}>
                <MockRouter initialRoute="/clientHome">
                    <Route exact path="/" component={LandingPage}/>
                    <ProtectedClientRoute exact path="/clientHome" component={ClientHomePage}/>
                </MockRouter>
            </Provider>
        );
    });

    test("Redirects to home page if the user doesn't have an account type of client", () => {
        const initialState = {
            auth : {
                isAuthenticated : true,
                accountType : "bandleader",
            },
        };

        const store = mockStore(initialState);

        const {} = render(
            <Provider store={store}>
                <MockRouter initialRoute="/clientHome">
                    <Route exact path="/" component={LandingPage}/>
                    <ProtectedClientRoute exact path="/clientHome" component={ClientHomePage}/>
                </MockRouter>
            </Provider>
        );
    });

    test("Returns component when user is authenticated and has account type of client", () => {
        const initialState = {
            auth : {
                isAuthenticated : true,
                accountType : "client",
            },
        };

        const store = mockStore(initialState);

        const {} = render(
            <Provider store={store}>
                <MockRouter initialRoute="/clientHome">
                    <Route exact path="/" component={LandingPage}/>
                    <ProtectedClientRoute exact path="/clientHome" component={ClientHomePage}/>
                </MockRouter>
            </Provider>
        );
    });
});