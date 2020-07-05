import React from "react";
import ClientEditSetListPage from "./ClientEditSetListPage";
import configureStore from "store/configureStore";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Route } from "react-router-dom";
import MockRouter from "testUtils/MockRouter";
import { Provider } from "react-redux";
import axios from "axios";
import BandleaderHomePage from "../BandleaderHomePage/BandleaderHomePage";

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

    test("Suggested Set List Loads", async () => {
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

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        expect(screen.getByText("Uptown Funk - Bruno Mars")).toBeInTheDocument();

        expect(screen.getByText("Treasure - Bruno Mars")).toBeInTheDocument();

        expect(screen.getByText("Client Comments Here")).toBeInTheDocument();
    });

    test("Suggested Set List Error", async () => {
        const getSuggestedSetListResponse = {
            errorMessage : "Error here",
        };

        jest.spyOn(axios, "get").mockRejectedValueOnce({response : {data : {...getSuggestedSetListResponse}}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/bandleader/clientEditSetList/1">
                    <Route exact path="/bandleader/clientEditSetList/:clientId" component={ClientEditSetListPage}/>
                </MockRouter>
            </Provider>
        );

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        expect(screen.getByText("Error here")).toBeInTheDocument();
    });

    test("Add Bandleader Comment", async () => {
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

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        fireEvent.change(screen.getByTestId("CommentsTextInput"), {target : {value : "Bandleader Comment Here"}});
        expect(screen.getByTestId("CommentsTextInput").value).toEqual("Bandleader Comment Here");

        fireEvent.click(screen.getByTestId("Add CommentButton"));

        await waitFor(() => expect(screen.getByText("Bandleader Comment Here")).toBeInTheDocument());

        expect(screen.getByTestId("CommentsTextInput").value).toEqual("");
    });

    test("Send Edited setlist success", async () => {
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
                    <Route exact path="/bandleaderHome" component={BandleaderHomePage}/>
                </MockRouter>
            </Provider>
        );

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        jest.spyOn(axios, "patch").mockResolvedValueOnce();

        fireEvent.click(screen.getByTestId("Send Setlist to ClientButton"));

        await waitFor(() => expect(screen.getByText("Band Leader Home Page")).toBeInTheDocument());
    });

    test("Send Edited setlist error", async () => {
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
                    <Route exact path="/bandleaderHome" component={BandleaderHomePage}/>
                </MockRouter>
            </Provider>
        );

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        const editCompletedSetListResponse = {
            errorMessage : "Error here",
        };

        jest.spyOn(axios, "patch").mockRejectedValueOnce({response : {data : {...editCompletedSetListResponse}}});

        fireEvent.click(screen.getByTestId("Send Setlist to ClientButton"));

        await waitFor(() => expect(screen.getByText("Error here")).toBeInTheDocument());
    });
});