import React from "react";
import onLeave from "./onLeave";
import MockRouter from "testUtils/MockRouter";
import { render, fireEvent } from "@testing-library/react";
import {Route, Switch} from "react-router-dom";
import LandingPage from "pages/LandingPage/LandingPage";
import ClientLoginPage from "pages/ClientPages/ClientLoginPage/ClientLoginPage";
import { Provider } from "react-redux";
import configureStore from "store/configureStore";

describe("onLeave", () => {
    test("Clear Error Message dispatches and clears error message when leaving page", () => {
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

        const {getByText} = render(
            <Provider store={store}>
                <MockRouter initialRoute="/">
                    <WrappedComponent/>
                </MockRouter>
            </Provider>
        );

        fireEvent.click(getByText("Client"));

        const expectedErrorState = {
            errorMessage : "",
        };
 
        expect(store.getState().error).toEqual(expectedErrorState);
    });
});