import React from "react";
import Layout from "./Layout";
import { render, screen } from "@testing-library/react";
import MockRouter from "testUtils/MockRouter";
import { Provider } from "react-redux";
import configureStore from "store/configureStore";

describe("<Layout/>", () => {
    test("Renders Correctly", () => {
        const initialState = {
            auth : {
                isAuthenticated : false,
            },
        };

        const store = configureStore(initialState);

        render(
            <Provider store={store}>
                <MockRouter>
                    <Layout>
                        Layout Here
                    </Layout>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByTestId("navbar")).toBeInTheDocument();
        expect(screen.getByTestId("mainContentContainer")).toBeInTheDocument();
        expect(screen.getByText("Layout Here")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });
});