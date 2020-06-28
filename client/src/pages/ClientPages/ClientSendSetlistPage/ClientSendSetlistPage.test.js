import React from "react";
import ClientSendSetListPage from "./ClientSendSetListPage";
import axios from "axios";
import configureStore from "store/configureStore";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import MockRouter from "testUtils/MockRouter";
import { Route } from "react-router-dom";
import ClientHomePage from "../ClientHomePage/ClientHomePage";


describe("<ClientSendSetListPage/>", () => {

    test("Client Songs Load", async () => {
        const getClientSongsActionResponse = {
            doNotPlaySongsList : [
                {
                    songname : "Uptown Funk",
                    artistname : "Bruno Mars",
                    id : 1,
                }
            ],
            requestedSongsList : [],
            setListAvailable : false,
            clientApproved : false,
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getClientSongsActionResponse}});

        const initialState = {
            client : {
                requestedSongsList : [], 
                doNotPlaySongsList : [], 
                setListAvailable : false,
                clientApproved : false,
            },
        };

        const store = configureStore(initialState);

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/client/sendSetList">
                    <Route exact path="/client/sendSetList" component={ClientSendSetListPage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByText("Send Setlist")).toBeInTheDocument();

        await waitFor(() => expect(screen.getByText("Uptown Funk")).toBeInTheDocument());

    });
    test("Set List Available - Setlist Sent Already Text Displays", async () => {
        const getClientSongsActionResponse = {
            doNotPlaySongsList : [
                {
                    songname : "Uptown Funk",
                    artistname : "Bruno Mars",
                    id : 1,
                }
            ],
            requestedSongsList : [],
            setListAvailable : true,
            clientApproved : false,
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getClientSongsActionResponse}});

        const initialState = {
            client : {
                requestedSongsList : [], 
                doNotPlaySongsList : [], 
                setListAvailable : false,
                clientApproved : false,
            },
        };

        const store = configureStore(initialState);

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/client/sendSetList">
                    <Route exact path="/client/sendSetList" component={ClientSendSetListPage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByText("Send Setlist")).toBeInTheDocument();

        await waitFor(() => expect(screen.getByText("Setlist Sent Already!")).toBeInTheDocument());
    });

    test("Deleted song doesn't display", async () => {
        const getClientSongsActionResponse = {
            doNotPlaySongsList : [
                {
                    songname : "Uptown Funk",
                    artistname : "Bruno Mars",
                    id : 1,
                }
            ],
            requestedSongsList : [],
            setListAvailable : false,
            clientApproved : false,
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getClientSongsActionResponse}});

        const initialState = {
            client : {
                requestedSongsList : [], 
                doNotPlaySongsList : [], 
                setListAvailable : false,
                clientApproved : false,
            },
        };

        const store = configureStore(initialState);

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/client/sendSetList">
                    <Route exact path="/client/sendSetList" component={ClientSendSetListPage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByText("Send Setlist")).toBeInTheDocument();

        await waitFor(() => expect(screen.getByText("Uptown Funk")).toBeInTheDocument());

        const deleteClientSongActionResponse = {
            doNotPlaySongsList : [],
            requestedSongsList : [],
            setListAvailable : false,
            clientApproved : false,
        };

        jest.spyOn(axios, "delete").mockResolvedValueOnce({data : {...deleteClientSongActionResponse}});

        fireEvent.click(screen.getByTestId("RemoveButton"));

        await waitFor(() => expect(screen.queryByText("Uptown Funk")).toBeNull());
    });

    test("Set List Not Available - Send Playlist Button Displays", async () => {
        const getClientSongsActionResponse = {
            doNotPlaySongsList : [
                {
                    songname : "Uptown Funk",
                    artistname : "Bruno Mars",
                    id : 1,
                }
            ],
            requestedSongsList : [],
            setListAvailable : false,
            clientApproved : false,
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getClientSongsActionResponse}});

        const initialState = {
            client : {
                requestedSongsList : [], 
                doNotPlaySongsList : [], 
                setListAvailable : false,
                clientApproved : false,
            },
        };

        const store = configureStore(initialState);

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/client/sendSetList">
                    <Route exact path="/client/sendSetList" component={ClientSendSetListPage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByText("Send Setlist")).toBeInTheDocument();

        await waitFor(() => expect(screen.getByText("Send Playlist")).toBeInTheDocument());
    });

    test("Send Set List redirects to Client Home", async () => {
        const getClientSongsActionResponse = {
            doNotPlaySongsList : [
                {
                    songname : "Uptown Funk",
                    artistname : "Bruno Mars",
                    id : 1,
                }
            ],
            requestedSongsList : [],
            setListAvailable : false,
            clientApproved : false,
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getClientSongsActionResponse}});

        const initialState = {
            client : {
                requestedSongsList : [], 
                doNotPlaySongsList : [], 
                setListAvailable : false,
                clientApproved : false,
            },
        };

        const store = configureStore(initialState);

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/client/sendSetList">
                    <Route exact path="/client/sendSetList" component={ClientSendSetListPage}/>
                    <Route exact path="/clientHome" component={ClientHomePage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByText("Send Setlist")).toBeInTheDocument();

        await waitFor(() => expect(screen.getByText("Send Playlist")).toBeInTheDocument());

        const sendClientSetListActionResponse = {
            doNotPlaySongsList : [
                {
                    songname : "Uptown Funk",
                    artistname : "Bruno Mars",
                    id : 1,
                }
            ],
            requestedSongsList : [],
            setListAvailable : true,
            clientApproved : false,
        };

        jest.spyOn(axios, "patch").mockResolvedValueOnce({data : {...sendClientSetListActionResponse}});

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getClientSongsActionResponse}});

        fireEvent.click(screen.getByText("Send Playlist"));

        await waitFor(() => expect(screen.getByText("Musical Preferences Page")).toBeInTheDocument());
    });
});