import React from "react";
import ClientEditSetListPage from "./ClientEditSetListPage";
import configureStore from "store/configureStore";
import { render, screen, waitFor } from "@testing-library/react";
import { Route } from "react-router-dom";
import MockRouter from "testUtils/MockRouter";
import { Provider } from "react-redux";
import axios from "axios";

describe("<ClientEditSetListPage/>", () => {
    
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test("Loading Spinner", async () => {

        const getSuggestedSetListResponse = {
            suggestedSetList : [
                {
                    songname : "Uptown Funk",
                    artistname : "Bruno Mars",
                    id : 1,
                }
            ],
            additionalClientRequests : [
                {
                    songname : "Treasure",
                    artistname : "Bruno Mars",
                    id : 2,
                }
            ],
            clientComments : ["Client Comments Here"],
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getSuggestedSetListResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/bandleader/clientEditSetList/1">
                    <Route exact path="/bandleader/clientEditSetList/:clientId" component={ClientEditSetListPage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());
    });

    test("Suggested Set List Loads", () => {

    });

    test("Suggested Set List Error", () => {

    });

    test("Add Bandleader Comment", () => {

    });

    test("Send Edited setlist success", () => {

    });

    test("Send Edited setlist error", () => {

    });
});