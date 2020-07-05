import React from "react";
import onLeave from "./onLeave";
import MockRouter from "testUtils/MockRouter";
import { render, fireEvent, screen } from "@testing-library/react";
import {Route, Switch} from "react-router-dom";
import LandingPage from "pages/LandingPage/LandingPage";
import ClientLoginPage from "pages/ClientPages/ClientLoginPage/ClientLoginPage";
import { Provider } from "react-redux";
import configureStore from "store/configureStore";

describe("onLeave", () => {
    test("Clears error message in state when leaving page", () => {
        const Component = () => (
            <Switch>
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/clientLogin" component={ClientLoginPage}/>
            </Switch>
        );

        const WrappedComponent = onLeave(Component);

        const initialState = {
            error : {
                errorMessage : "Error Message Here",
            }
        };

        const store = configureStore(initialState);

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/">
                    <WrappedComponent/>
                </MockRouter>
            </Provider>
        );

        fireEvent.click(screen.getByText("Client"));

        const expectedErrorState = {
            errorMessage : "",
        };
 
        expect(store.getState().error).toEqual(expectedErrorState);
    });
});