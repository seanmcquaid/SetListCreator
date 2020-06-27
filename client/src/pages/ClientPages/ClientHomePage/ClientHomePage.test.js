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

        test("Add Requested Song", () => {
            
        });

        test("Add do not play song", () => {

        });

        test("Delete Song", () => {

        });

        test("Edit song button", () => {

        });
    });
});