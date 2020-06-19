import React from "react";
import onLeave from "./onLeave";
import MockRouter from "testUtils/MockRouter";
import { render, fireEvent } from "@testing-library/react";
import {Route, Switch} from "react-router-dom";
import LandingPage from "pages/LandingPage/LandingPage";
import ClientLoginPage from "pages/ClientPages/ClientLoginPage/ClientLoginPage";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { configureMockStore } from "@jedmao/redux-mock-store";

describe("onLeave", () => {
    test("Clear Error Message dispatches when leaving page", () => {
        const Component = () => (
            <Switch>
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/clientLogin" component={ClientLoginPage}/>
            </Switch>
        );
        const WrappedComponent = onLeave(Component);
        const middleware = [ReduxThunk];
        const mockStore = configureMockStore(middleware);

        const store = mockStore({
            error : {
                errorMessage : "",
            },
            auth : {
                isAuthenticated : false,
            }
        });

        const {getByText} = render(
            <Provider store={store}>
                <MockRouter initialRoute="/">
                    <WrappedComponent/>
                </MockRouter>
            </Provider>
        );

        fireEvent.click(getByText("Client"));

        const expectedActions = [ 
            { 
                type: "CLEAR_ERROR_MESSAGE" 
            } 
        ];
        
        expect(store.getActions()).toEqual(expectedActions);
    });
});