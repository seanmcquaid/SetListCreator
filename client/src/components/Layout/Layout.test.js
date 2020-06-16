import React from "react";
import Layout from "./Layout";
import { render } from "@testing-library/react";
import MockRouter from "testUtils/MockRouter";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { configureMockStore } from "@jedmao/redux-mock-store";

describe("<Layout/>", () => {
    test("", () => {
        const middleware = [ReduxThunk];
        const mockStore = configureMockStore(middleware);
        const initialState = {
            auth : {
                isAuthenticated : false,
            },
        };

        const store = mockStore(initialState);

        const {} = render(
            <Provider store={store}>
                <MockRouter>
                    <Layout>
                        Layout Here
                    </Layout>
                </MockRouter>
            </Provider>
        )
    });
});