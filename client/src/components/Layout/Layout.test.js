import React from "react";
import Layout from "./Layout";
import { render } from "@testing-library/react";
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

        const {getByTestId, getByText} = render(
            <Provider store={store}>
                <MockRouter>
                    <Layout>
                        Layout Here
                    </Layout>
                </MockRouter>
            </Provider>
        );

        expect(getByTestId("navbar")).toBeInTheDocument();
        expect(getByTestId("mainContentContainer")).toBeInTheDocument();
        expect(getByText("Layout Here")).toBeInTheDocument();
        expect(getByTestId("footer")).toBeInTheDocument();
    });
});