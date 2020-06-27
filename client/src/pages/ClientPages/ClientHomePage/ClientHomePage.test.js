import React from "react";
import ClientHomePage from "./ClientHomePage";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import MockRouter from "testUtils/MockRouter";
import configureStore from "store/configureStore";
import { Route } from "react-router-dom";
import axios from "axios";

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

        test("Finalized Setlist button goes to correct route when Set List is finalized and Client Approved", () => {

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
    
        test("Proposed Setlist", () => {
    
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