import React from "react";
import ClientInfoPage from "./ClientInfoPage";
import configureStore from "store/configureStore";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import MockRouter from "testUtils/MockRouter";
import { Route } from "react-router-dom";
import axios from "axios";

describe("<ClientInfoPage/>", () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test("Loading Spinner is displayed on initial load", async () => {

        const getClientSongsResponse = {
            doNotPlaySongsList : [],
            requestedSongsList : [
                {
                    songname : "Uptown Funk",
                    artistname : "Bruno Mars",
                    id : 1,
                }
            ],
            userInfo : {
                username : "test user",
                setListAvailable : false, 
                id : 1,
            },
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getClientSongsResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/bandleader/clientInfo/1">
                    <Route exact path="/bandleader/clientInfo/:clientId" component={ClientInfoPage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());
    });

    test("Loads Client Info", () => {

    });

    test("Error on Client Info displays error message", () => {

    });

    test("Create Set List Button displays when set list is available", () => {

    });

    test("In Progress displays when Set List Isn't Available", () => {

    });


});