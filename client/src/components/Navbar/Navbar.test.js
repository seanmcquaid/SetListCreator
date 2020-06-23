import React from "react";
import Navbar from "./Navbar";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import MockRouter from "testUtils/MockRouter";
import { act } from "react-dom/test-utils";
import configureStore from "store/configureStore";

describe("<Navbar/>", () => {

    describe("Left Nav", () => {

        test("Route is correct when user is authenticated and has account type of client", () => {
            const initialState = {
                auth : {
                    isAuthenticated : true,
                    accountType : "client",
                },
            };
            const store = configureStore(initialState);

            const {getByText} = render(
                <Provider store={store}>
                    <MockRouter>
                        <Navbar/>
                    </MockRouter>
                </Provider>
            );

            expect(getByText("SLC").href).toEqual("http://localhost/clientHome");
        });

        test("Route is correct when user is authenticated and has account type of bandleader", () => {
            const initialState = {
                auth : {
                    isAuthenticated : true,
                    accountType : "bandleader",
                },
            };
            const store = configureStore(initialState);

            const {getByText} = render(
                <Provider store={store}>
                    <MockRouter>
                        <Navbar/>
                    </MockRouter>
                </Provider>
            );

            expect(getByText("SLC").href).toEqual("http://localhost/bandleaderHome");
        });

        test("Route is correct when user is not authenticated", () => {
            const initialState = {
                auth : {
                    isAuthenticated : false,
                    accountType : "",
                },
            };
            const store = configureStore(initialState);

            const {getByText} = render(
                <Provider store={store}>
                    <MockRouter>
                        <Navbar/>
                    </MockRouter>
                </Provider>
            );

            expect(getByText("SLC").href).toEqual("http://localhost/");
        });

        test("Left Nav Click icon click - toggles mobile nav when screen is less than 750px in width", () => {
            const initialState = {
                auth : {
                    isAuthenticated : false,
                    accountType : "",
                },
            };
            const store = configureStore(initialState);

            const {getByText, getByTestId} = render(
                <Provider store={store}>
                    <MockRouter>
                        <Navbar/>
                    </MockRouter>
                </Provider>
            );

            act(() => {
                window.innerWidth = 500;
                window.innerHeight = 500;
                fireEvent(window, new Event("resize"));
            });

            fireEvent.click(getByTestId("hamburgerIcon"));

            expect(getByText("Client")).toBeVisible();

            fireEvent.click(getByText("SLC"));

            expect(getByText("Client")).not.toBeVisible();
        });
    });

    describe("Right Nav", () => {
        test("Right nav renders correctly when user is authenticated and has account type of client", () => {
            const initialState = {
                auth : {
                    isAuthenticated : true,
                    accountType : "client",
                },
            };
            const store = configureStore(initialState);

            const {getByText} = render(
                <Provider store={store}>
                    <MockRouter>
                        <Navbar/>
                    </MockRouter>
                </Provider>
            );

            expect(getByText("Home")).toBeInTheDocument();
            expect(getByText("Profile")).toBeInTheDocument();
            expect(getByText("Logout")).toBeInTheDocument();
        });

        test("Right nav renders correctly when user is authenticated and has account type of bandleader", () => {
            const initialState = {
                auth : {
                    isAuthenticated : true,
                    accountType : "bandleader",
                },
            };
            const store = configureStore(initialState);

            const {getByText} = render(
                <Provider store={store}>
                    <MockRouter>
                        <Navbar/>
                    </MockRouter>
                </Provider>
            );

            expect(getByText("Client List")).toBeInTheDocument();
            expect(getByText("Add Songs")).toBeInTheDocument();
            expect(getByText("Profile")).toBeInTheDocument();
            expect(getByText("Logout")).toBeInTheDocument();
        });

        test("Right nav renders correctly when user is not authenticated", () => {
            const initialState = {
                auth : {
                    isAuthenticated : false,
                    accountType : "",
                },
            };
            const store = configureStore(initialState);

            const {getByText} = render(
                <Provider store={store}>
                    <MockRouter>
                        <Navbar/>
                    </MockRouter>
                </Provider>
            );

            expect(getByText("Client")).toBeInTheDocument();
            expect(getByText("Bandleader")).toBeInTheDocument();
        });

        test("Mobile nav toggle", () => {
            const initialState = {
                auth : {
                    isAuthenticated : false,
                    accountType : "",
                },
            };
            const store = configureStore(initialState);

            const {getByText, getByTestId} = render(
                <Provider store={store}>
                    <MockRouter>
                        <Navbar/>
                    </MockRouter>
                </Provider>
            );

            act(() => {
                window.innerWidth = 500;
                window.innerHeight = 500;
                fireEvent(window, new Event("resize"));
            });

            fireEvent.click(getByTestId("hamburgerIcon"));

            expect(getByText("Client")).toBeVisible();

            fireEvent.click(getByText("Client"));

            expect(getByText("Client")).not.toBeVisible();
        });

        describe("Logout Button", () => {
            test("Dispatches logout action and returns initial state", () => {
                const initialState = {
                    auth : {
                        isAuthenticated : true,
                        accountType : "bandleader",
                    },
                };
                const store = configureStore(initialState);
    
                const {getByText, getByTestId} = render(
                    <Provider store={store}>
                        <MockRouter>
                            <Navbar/>
                        </MockRouter>
                    </Provider>
                );
    
                act(() => {
                    window.innerWidth = 500;
                    window.innerHeight = 500;
                    fireEvent(window, new Event("resize"));
                });
    
                fireEvent.click(getByTestId("hamburgerIcon"));

                expect(getByText("Logout")).toBeVisible();
                
                fireEvent.click(getByText("Logout"));

                const expectedAuthState = { 
                    isAuthenticated: false,
                    token: null,
                    username: "",
                    accountType: "",
                    isLoading: false 
                };

                expect(store.getState().auth).toEqual(expectedAuthState);
            });

            test("Toggles nav", () => {
                const initialState = {
                    auth : {
                        isAuthenticated : true,
                        accountType : "bandleader",
                    },
                };
                const store = configureStore(initialState);
    
                const {getByText, getByTestId, queryByText} = render(
                    <Provider store={store}>
                        <MockRouter>
                            <Navbar/>
                        </MockRouter>
                    </Provider>
                );
    
                act(() => {
                    window.innerWidth = 500;
                    window.innerHeight = 500;
                    fireEvent(window, new Event("resize"));
                });
    
                fireEvent.click(getByTestId("hamburgerIcon"));

                expect(getByText("Logout")).toBeVisible();
                
                fireEvent.click(getByText("Logout"));

                expect(queryByText("Logout")).toBeNull();

                expect(getByText("Client")).toBeInTheDocument();
            });
        });
    });
});