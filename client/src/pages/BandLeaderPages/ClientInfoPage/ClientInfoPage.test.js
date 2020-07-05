import React from "react";
import ClientInfoPage from "./ClientInfoPage";
import configureStore from "store/configureStore";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import MockRouter from "testUtils/MockRouter";
import { Route } from "react-router-dom";
import axios from "axios";
import SetListCreatorPage from "../SetListCreatorPage/SetListCreatorPage";

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

    test("Loads Set List Info", async () => {
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

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        expect(screen.getByText("Client name : test user")).toBeInTheDocument();

        expect(screen.getByText("Uptown Funk - Bruno Mars")).toBeInTheDocument();
    });

    test("Error on Set List Info displays error message", async () => {
        const getClientSongsResponse = {
            errorMessage : "Error here",
        };

        jest.spyOn(axios, "get").mockRejectedValueOnce({response : {data : {...getClientSongsResponse}}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/bandleader/clientInfo/1">
                    <Route exact path="/bandleader/clientInfo/:clientId" component={ClientInfoPage}/>
                </MockRouter>
            </Provider>
        );

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        expect(screen.getByText("Error here")).toBeInTheDocument();
    });

    test("Create Set List Button displays when set list is available", async () => {
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
                setListAvailable : true, 
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

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        expect(screen.getByTestId("Create SetlistLinkButton")).toBeInTheDocument();
    });

    test("Create Set List Button redirects to Set List Creator Page", async () => {
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
                setListAvailable : true, 
                id : 1,
            },
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getClientSongsResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/bandleader/clientInfo/1">
                    <Route exact path="/bandleader/clientInfo/:clientId" component={ClientInfoPage}/>
                    <Route exact path="/bandleader/createSetList/:clientId" component={SetListCreatorPage}/>
                </MockRouter>
            </Provider>
        );

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

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
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getSuggestedSetListResponse}});

        fireEvent.click(screen.getByTestId("Create SetlistLinkButton"));

        await waitFor(() => expect(screen.getByText("Set List Creator")).toBeInTheDocument());
    });

    test("In Progress displays when Set List Isn't Available", async () => {
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

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        expect(screen.getByText("In Progress")).toBeInTheDocument();
    });

});