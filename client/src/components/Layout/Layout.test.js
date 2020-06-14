import React from "react";
import Layout from "./Layout";
import MockProvider from "testUtils/MockProvider";
import { render } from "@testing-library/react";
import authReducer from "reducers/authReducer/authReducer";


const reducers = {
    auth : authReducer,
};

describe("<Layout/>", () => {
    test("", () => {
        const {} = render(
            <MockProvider reducers={reducers}>
                <Layout>
                    Children Here
                </Layout>
            </MockProvider>
        )
    });
});