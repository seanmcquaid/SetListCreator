import React from "react";
import Navbar from "./Navbar";
import { render, fireEvent, screen } from "@testing-library/react";
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

            render(
                <Provider store={store}>
                    <MockRouter>
                        <Navbar/>
                    </MockRouter>
                </Provider>
            );

            expect(screen.getByText("SLC").href).toEqual("http://localhost/clientHome");
        });

        test("Route is correct when user is authenticated and has account type of bandleader", () => {
            const initialState = {
                auth : {
                    isAuthenticated : true,
                    accountType : "bandleader",
                },
            };
            const store = configureStore(initialState);

            render(
                <Provider store={store}>
                    <MockRouter>
                        <Navbar/>
                    </MockRouter>
                </Provider>
            );

            expect(screen.getByText("SLC").href).toEqual("http://localhost/bandleaderHome");
        });

        test("Route is correct when user is not authenticated", () => {
            const initialState = {
                auth : {
                    isAuthenticated : false,
                    accountType : "",
                },
            };
            const store = configureStore(initialState);

            render(
                <Provider store={store}>
                    <MockRouter>
                        <Navbar/>
                    </MockRouter>
                </Provider>
            );

            expect(screen.getByText("SLC").href).toEqual("http://localhost/");
        });

        test("Left Nav Click icon click - toggles mobile nav when screen is less than 750px in width", () => {
            const initialState = {
                auth : {
                    isAuthenticated : false,
                    accountType : "",
                },
            };
            const store = configureStore(initialState);

            render(
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

            fireEvent.click(screen.getByTestId("hamburgerIcon"));

            expect(screen.getByText("Client")).toBeVisible();

            fireEvent.click(screen.getByText("SLC"));

            expect(screen.getByText("Client")).not.toBeVisible();
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

            render(
                <Provider store={store}>
                    <MockRouter>
                        <Navbar/>
                    </MockRouter>
                </Provider>
            );

            expect(screen.getByText("Home")).toBeInTheDocument();
            expect(screen.getByText("Profile")).toBeInTheDocument();
            expect(screen.getByText("Logout")).toBeInTheDocument();
        });

        test("Right nav renders correctly when user is authenticated and has account type of bandleader", () => {
            const initialState = {
                auth : {
                    isAuthenticated : true,
                    accountType : "bandleader",
                },
            };
            const store = configureStore(initialState);

            render(
                <Provider store={store}>
                    <MockRouter>
                        <Navbar/>
                    </MockRouter>
                </Provider>
            );

            expect(screen.getByText("Client List")).toBeInTheDocument();
            expect(screen.getByText("Add Songs")).toBeInTheDocument();
            expect(screen.getByText("Profile")).toBeInTheDocument();
            expect(screen.getByText("Logout")).toBeInTheDocument();
        });

        test("Right nav renders correctly when user is not authenticated", () => {
            const initialState = {
                auth : {
                    isAuthenticated : false,
                    accountType : "",
                },
            };
            const store = configureStore(initialState);

            render(
                <Provider store={store}>
                    <MockRouter>
                        <Navbar/>
                    </MockRouter>
                </Provider>
            );

            expect(screen.getByText("Client")).toBeInTheDocument();
            expect(screen.getByText("Bandleader")).toBeInTheDocument();
        });

        test("Mobile nav toggle", () => {
            const initialState = {
                auth : {
                    isAuthenticated : false,
                    accountType : "",
                },
            };
            const store = configureStore(initialState);

            render(
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

            fireEvent.click(screen.getByTestId("hamburgerIcon"));

            expect(screen.getByText("Client")).toBeVisible();

            fireEvent.click(screen.getByText("Client"));

            expect(screen.getByText("Client")).not.toBeVisible();
        });

        test("Logout button logs a user out when clicked", () => {
            const initialState = {
                auth : {
                    isAuthenticated : true,
                    accountType : "bandleader",
                },
            };
            const store = configureStore(initialState);

            render(
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

            fireEvent.click(screen.getByTestId("hamburgerIcon"));

            expect(screen.getByText("Logout")).toBeVisible();
            
            fireEvent.click(screen.getByText("Logout"));

            expect(screen.queryByText("Logout")).toBeNull();

            expect(screen.getByText("Client")).toBeInTheDocument();
        });
    });
});