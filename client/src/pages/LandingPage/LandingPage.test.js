import React from "react";
import LandingPage from "./LandingPage";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import MockRouter from "testUtils/MockRouter";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import ClientLoginPage from "pages/ClientPages/ClientLoginPage/ClientLoginPage";
import BandleaderLoginPage from "pages/BandleaderPages/BandleaderLoginPage/BandleaderLoginPage";
import configureStore from "store/configureStore";

describe("<LandingPage/>", () => {
    test("Renders correctly", () => {
        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/">
                    <Route exact path="/" component={LandingPage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByText("Set List Creator")).toBeInTheDocument();
    });

    describe("LinkButtons route correctly", () => {
        test("Client Login Button routes correctly", async () => {
            const store = configureStore();

            render(
                <Provider store={store}>
                    <MockRouter initialRoute="/">
                        <Route exact path="/" component={LandingPage}/>
                        <Route exact path="/clientLogin" component={ClientLoginPage}/>
                    </MockRouter>
                </Provider>
            );

            expect(screen.getByText("Set List Creator")).toBeInTheDocument();

            fireEvent.click(screen.getByText("Client"));

            await waitFor(() => expect(screen.getByText("Client Login")).toBeInTheDocument());
        });

        test("Bandleader Login Button routes correctly", async () => {
            const store = configureStore();

            render(
                <Provider store={store}>
                    <MockRouter initialRoute="/">
                        <Route exact path="/" component={LandingPage}/>
                        <Route exact path="/bandleaderLogin" component={BandleaderLoginPage}/>
                    </MockRouter>
                </Provider>
            );

            expect(screen.getByText("Set List Creator")).toBeInTheDocument();

            fireEvent.click(screen.getByText("Bandleader"));

            await waitFor(() => expect(screen.getByText("Band Leader Login")).toBeInTheDocument());
        });
    });
});