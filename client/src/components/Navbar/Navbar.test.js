import React from "react";
import Navbar from "./Navbar";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import MockRouter from "testUtils/MockRouter";
import { configureMockStore } from "@jedmao/redux-mock-store";
import ReduxThunk from "redux-thunk";

describe("<Navbar/>", () => {

    const middleware = [ReduxThunk];
    const mockStore = configureMockStore(middleware);
    describe("Left Nav", () => {

        test("Authenticated and client", () => {
            const initialState = {
                auth : {
                    isAuthenticated : true,
                    accountType : "client",
                },
            };
            const store = mockStore(initialState);

            const {getByText} = render(
                <Provider store={store}>
                    <MockRouter>
                        <Navbar/>
                    </MockRouter>
                </Provider>
            );

            expect(getByText("SLC").href).toEqual("http://localhost/clientHome");
        });

        test("Authenticated and bandleader", () => {
            const initialState = {
                auth : {
                    isAuthenticated : true,
                    accountType : "bandleader",
                },
            };
            const store = mockStore(initialState);

            const {getByText} = render(
                <Provider store={store}>
                    <MockRouter>
                        <Navbar/>
                    </MockRouter>
                </Provider>
            );

            expect(getByText("SLC").href).toEqual("http://localhost/bandleaderHome");
        });

        test("Not authenticated", () => {
            const initialState = {
                auth : {
                    isAuthenticated : false,
                    accountType : "",
                },
            };
            const store = mockStore(initialState);

            const {getByText} = render(
                <Provider store={store}>
                    <MockRouter>
                        <Navbar/>
                    </MockRouter>
                </Provider>
            );

            expect(getByText("SLC").href).toEqual("http://localhost/");
        });

        test("Mobile nav click toggles nav when screen is less than 750px in width", () => {

        });
    });

    describe("Right Nav", () => {
        test("Authenticated and client", () => {

        });

        test("Authenticated and bandleader", () => {

        });

        test("Not authenticated", () => {

        });

        describe("Logout Button", () => {
            test("Dispatches logout action", () => {

            });

            test("Toggles nav", () => {

            });
        });
    });
});