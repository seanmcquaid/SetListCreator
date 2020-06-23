import React from "react";
import ProtectedRoutes from "./ProtectedRoutes";
import { render } from "@testing-library/react";
import MockRouter from "testUtils/MockRouter";
import { Provider } from "react-redux";
import configureStore from "store/configureStore";

describe("<ProtectedRoutes/>", () => {
    test("Renders correct page when given valid route", () => {
        const initialState = {
            auth : {
                isAuthenticated : false,
                accountType : "bandleader",
            },
        };

        const store = configureStore(initialState);

        const {getByText} = render(
            <Provider store={store}>
                <MockRouter initialRoute="/">
                    <ProtectedRoutes/>
                </MockRouter>
            </Provider>
        );

        expect(getByText("Set List Creator")).toBeInTheDocument();
    });

    test("Renders error page when given invalid rotute", () => {
        const initialState = {
            auth : {
                isAuthenticated : false,
                accountType : "bandleader",
            },
        };

        const store = configureStore(initialState);
        
        const {getByText} = render(
            <Provider store={store}>
                <MockRouter initialRoute="/fakeRoute">
                    <ProtectedRoutes/>
                </MockRouter>
            </Provider>
        );

        expect(getByText("Page Not Found")).toBeInTheDocument();
    });
});