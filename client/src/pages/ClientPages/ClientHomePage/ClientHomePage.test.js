import React from "react";
import ClientHomePage from "./ClientHomePage";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import MockRouter from "testUtils/MockRouter";
import configureStore from "store/configureStore";
import { Route } from "react-router-dom";
import axios from "axios";
import FinalizedSetListPage from "../FinalizedSetListPage/FinalizedSetListPage";
import ClientSetListApprovalPage from "../ClientSetListApprovalPage/ClientSetListApprovalPage";
import ClientEditSongPage from "../ClientEditSongPage/ClientEditSongPage";

describe("<ClientHomePage/>", () => {

    describe("Set List Available", () => {

        beforeEach(() => {
            jest.useFakeTimers();
        });
    
        afterEach(() => {
            jest.useRealTimers();
        });

        test("Finalized Setlist button appears when Set List is finalized and Client Approved", () => {

            const getClientSongsActionResponse = {
                doNotPlaySongsList : [],
                requestedSongsList : [],
                setListAvailable : true,
                clientApproved : true
            };
    
            jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getClientSongsActionResponse}});

            const initialState = {
                client : {
                    requestedSongsList : [], 
                    doNotPlaySongsList : [], 
                    setListAvailable : true,
                    clientApproved : true,
                },
            };

            const store = configureStore(initialState);

            render(
                <Provider store={store}>
                    <MockRouter initialRoute="/clientHome">
                        <Route exact path="/clientHome" component={ClientHomePage}/>
                    </MockRouter>
                </Provider>
            );

            expect(screen.getByText("Client Home Page")).toBeInTheDocument();

            expect(screen.getByText("Get Finalized SetList")).toBeInTheDocument();
        });

        test("Finalized Setlist button goes to correct route when Set List is finalized and Client Approved", async () => {

            const getClientSongsActionResponse = {
                doNotPlaySongsList : [],
                requestedSongsList : [],
                setListAvailable : true,
                clientApproved : true
            };
    
            jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getClientSongsActionResponse}});

            const initialState = {
                client : {
                    requestedSongsList : [], 
                    doNotPlaySongsList : [], 
                    setListAvailable : true,
                    clientApproved : true,
                },
            };

            const store = configureStore(initialState);

            render(
                <Provider store={store}>
                    <MockRouter initialRoute="/clientHome">
                        <Route exact path="/clientHome" component={ClientHomePage}/>
                        <Route exact path="/client/finalizedSetList" component={FinalizedSetListPage}/>
                    </MockRouter>
                </Provider>
            );

            expect(screen.getByText("Client Home Page")).toBeInTheDocument();

            expect(screen.getByText("Get Finalized SetList")).toBeInTheDocument();

            const getFinalizedSetListInfoResponse = {
                suggestedSetList : [{
                    songname : "Uptown Funk",
                    artistname : "Bruno Mars",
                    id : 1,
                }],
            };
    
            jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getFinalizedSetListInfoResponse}});

            fireEvent.click(screen.getByText("Get Finalized SetList"));

            await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

            expect(screen.getByText("Final Set List")).toBeInTheDocument();
        });
    
        test("Proposed Setlist button appears when Set List is finalized and isn't Client Approved", () => {
    
            const getClientSongsActionResponse = {
                doNotPlaySongsList : [],
                requestedSongsList : [],
                setListAvailable : true,
                clientApproved : false,
            };
    
            jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getClientSongsActionResponse}});

            const initialState = {
                client : {
                    requestedSongsList : [], 
                    doNotPlaySongsList : [], 
                    setListAvailable : true,
                    clientApproved : false,
                },
            };

            const store = configureStore(initialState);

            render(
                <Provider store={store}>
                    <MockRouter initialRoute="/clientHome">
                        <Route exact path="/clientHome" component={ClientHomePage}/>
                    </MockRouter>
                </Provider>
            );

            expect(screen.getByText("Client Home Page")).toBeInTheDocument();

            expect(screen.getByText("Look at Proposed SetList")).toBeInTheDocument();
        });

        test("Proposed Setlist button goes to correct route when Set List is finalized and isn't Client Approved", async () => {
    
            const getClientSongsActionResponse = {
                doNotPlaySongsList : [],
                requestedSongsList : [],
                setListAvailable : true,
                clientApproved : false,
            };
    
            jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getClientSongsActionResponse}});

            const initialState = {
                client : {
                    requestedSongsList : [], 
                    doNotPlaySongsList : [], 
                    setListAvailable : true,
                    clientApproved : false,
                },
            };

            const store = configureStore(initialState);

            render(
                <Provider store={store}>
                    <MockRouter initialRoute="/clientHome">
                        <Route exact path="/clientHome" component={ClientHomePage}/>
                        <Route exact path="/client/setListApproval" component={ClientSetListApprovalPage}/>
                    </MockRouter>
                </Provider>
            );

            expect(screen.getByText("Client Home Page")).toBeInTheDocument();

            expect(screen.getByText("Look at Proposed SetList")).toBeInTheDocument();

            const getCompletedSetListInfoResponse = {
                clientName : "test client",
                bandleaderName : "test bandleader",
                suggestedSetList : [
                    {
                        songname : "Uptown Funk",
                        artistname : "Bruno Mars",
                        id : 1,
                    }
                ],
                bandleaderComments : [],
            };
    
            jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getCompletedSetListInfoResponse}});

            fireEvent.click(screen.getByText("Look at Proposed SetList"));

            await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

            expect(screen.getByText("Proposed Set List")).toBeInTheDocument();
        });
    });

    describe("Set List Isn't available", () => {

        beforeEach(() => {
            jest.useFakeTimers();
        });
    
        afterEach(() => {
            jest.useRealTimers();
        });

        test("Added Requested Song displays", async () => {
            const getClientSongsActionResponse = {
                doNotPlaySongsList : [],
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
                    <MockRouter initialRoute="/clientHome">
                        <Route exact path="/clientHome" component={ClientHomePage}/>
                    </MockRouter>
                </Provider>
            );

            fireEvent.change(screen.getByTestId("Requested Song NameTextInput"), {target : { value : "Uptown Funk"}});
            expect(screen.getByTestId("Requested Song NameTextInput").value).toEqual("Uptown Funk");

            fireEvent.change(screen.getByTestId("Requested Artist NameTextInput"), {target : { value : "Bruno Mars"}});
            expect(screen.getByTestId("Requested Artist NameTextInput").value).toEqual("Bruno Mars");

            const addClientRequestedSongActionResponse = {
                doNotPlaySongsList : [],
                requestedSongsList : [
                    {
                        songname : "Uptown Funk",
                        artistname : "Bruno Mars",
                        id : 1,
                    }
                ],
                setListAvailable : false,
                clientApproved : false,
            };
    
            jest.spyOn(axios, "post").mockResolvedValueOnce({data : {...addClientRequestedSongActionResponse}});

            fireEvent.click(screen.getByTestId("Add Requested SongButton"));

            await waitFor(() => expect(screen.getByText("Uptown Funk")).toBeInTheDocument());

            expect(screen.getByTestId("Requested Song NameTextInput").value).toEqual("");

            expect(screen.getByTestId("Requested Artist NameTextInput").value).toEqual("");
        });

        test("Added do not play song displays", async () => {
            const getClientSongsActionResponse = {
                doNotPlaySongsList : [],
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
                    <MockRouter initialRoute="/clientHome">
                        <Route exact path="/clientHome" component={ClientHomePage}/>
                    </MockRouter>
                </Provider>
            );

            fireEvent.change(screen.getByTestId("Do Not Play Song NameTextInput"), {target : { value : "Uptown Funk"}});
            expect(screen.getByTestId("Do Not Play Song NameTextInput").value).toEqual("Uptown Funk");

            fireEvent.change(screen.getByTestId("Do Not Play Artist NameTextInput"), {target : { value : "Bruno Mars"}});
            expect(screen.getByTestId("Do Not Play Artist NameTextInput").value).toEqual("Bruno Mars");

            const addClientDoNotPlaySongActionResponse = {
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
    
            jest.spyOn(axios, "post").mockResolvedValueOnce({data : {...addClientDoNotPlaySongActionResponse}});

            fireEvent.click(screen.getByTestId("Add Do Not Playlist SongButton"));

            await waitFor(() => expect(screen.getByText("Uptown Funk")).toBeInTheDocument());

            expect(screen.getByTestId("Do Not Play Song NameTextInput").value).toEqual("");

            expect(screen.getByTestId("Do Not Play Artist NameTextInput").value).toEqual("");
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
                    <MockRouter initialRoute="/clientHome">
                        <Route exact path="/clientHome" component={ClientHomePage}/>
                    </MockRouter>
                </Provider>
            );

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

        test("Edit song button redirects to edit song page", async () => {
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
                    <MockRouter initialRoute="/clientHome">
                        <Route exact path="/clientHome" component={ClientHomePage}/>
                        <Route exact path="/client/editSong/:songId" component={ClientEditSongPage}/>
                    </MockRouter>
                </Provider>
            );

            await waitFor(() => expect(screen.getByText("Uptown Funk")).toBeInTheDocument());

            const getSongResponse = {
                songInfo : {
                    songname : "Uptown Funk",
                    artistname : "Bruno Mars",
                    songtype : "doNotPlaySong",
                },
            }

            jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getSongResponse}});

            fireEvent.click(screen.getByTestId("EditLinkButton"));

            await waitFor(() => expect(screen.getByText("Edit Song")).toBeInTheDocument());
        });
    });
});