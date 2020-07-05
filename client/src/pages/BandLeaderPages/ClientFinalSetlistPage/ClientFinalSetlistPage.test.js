import React from "react";
import ClientFinalSetListPage from "./ClientFinalSetListPage";
import configureStore from "store/configureStore";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import MockRouter from "testUtils/MockRouter";
import { Route } from "react-router-dom";
import axios from "axios";

describe("<ClientFinalSetListPage/>", () => {
    
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test("Loading Spinner", async () => {
        const getClientSetListInfoResponse = {
            clientName : "Test user",
            suggestedSetList : [
                {
                    songname : "Uptown Funk",
                    artistname : "Bruno Mars",
                    id : 1,
                }
            ],
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getClientSetListInfoResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/bandleader/clientFinalSetList/1">
                    <Route exact path="/bandleader/clientFinalSetList/:clientId" component={ClientFinalSetListPage}/>
                </MockRouter>
            </Provider>
        );
        
        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());
    });

    test("Loads Final Set List", () => {

    });

    test("Error displays", () => {

    });
});