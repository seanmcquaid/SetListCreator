import React from "react";
import ClientSetListApprovalPage from "./ClientSetListApprovalPage";
import configureStore from "store/configureStore";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import MockRouter from "testUtils/MockRouter";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import axios from "axios";

describe("<ClientSendSetListPage/>", () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test("Loading Spinner displays initially and disappears", async () => {
        const getCompletedSetlistResponse = {
            bandleaderComments : [
                "Band Leader Comments Here"
            ], 
            suggestedSetList : [
                {
                    songname : "Uptown Funk",
                    artistname : "Bruno Mars",
                    id : 1,
                }
            ]
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getCompletedSetlistResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/client/setListApproval">
                    <Route exact path="/client/setListApproval" component={ClientSetListApprovalPage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());
    });

    test("Set List Info and Comments Load", async () => {
        const getCompletedSetlistResponse = {
            bandleaderComments : [
                "Band Leader Comments Here"
            ], 
            suggestedSetList : [
                {
                    songname : "Uptown Funk",
                    artistname : "Bruno Mars",
                    id : 1,
                }
            ]
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getCompletedSetlistResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/client/setListApproval">
                    <Route exact path="/client/setListApproval" component={ClientSetListApprovalPage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        expect(screen.getByText("Proposed Set List")).toBeInTheDocument();

        expect(screen.getByText("Uptown Funk - Bruno Mars")).toBeInTheDocument();

        expect(screen.getByText("Band Leader Comments Here")).toBeInTheDocument();
    });

    test("Error Message when loading set list info", async () => {
        const getCompletedSetlistResponse = {
            errorMessage : "Error Message Here",
        };

        jest.spyOn(axios, "get").mockRejectedValueOnce({
            response : {
                data : {
                    ...getCompletedSetlistResponse
                },
            },
        });

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/client/setListApproval">
                    <Route exact path="/client/setListApproval" component={ClientSetListApprovalPage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        expect(screen.getByText("Error Message Here")).toBeInTheDocument();
    });

    test("Client Approval Dropdown status displays correctly", async () => {
        const getCompletedSetlistResponse = {
            bandleaderComments : [
                "Band Leader Comments Here"
            ], 
            suggestedSetList : [
                {
                    songname : "Uptown Funk",
                    artistname : "Bruno Mars",
                    id : 1,
                }
            ]
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getCompletedSetlistResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/client/setListApproval">
                    <Route exact path="/client/setListApproval" component={ClientSetListApprovalPage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        fireEvent.change(screen.getByTestId("Is This Approved?Dropdown"), {target : {value : "No"}});
        
        expect(screen.getByTestId("Is This Approved?Dropdown").value).toEqual("No");
    });

    test("Added comment displays and clears input of initial comment", async () => {
        const getCompletedSetlistResponse = {
            bandleaderComments : [
                "Band Leader Comments Here"
            ], 
            suggestedSetList : [
                {
                    songname : "Uptown Funk",
                    artistname : "Bruno Mars",
                    id : 1,
                }
            ]
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getCompletedSetlistResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/client/setListApproval">
                    <Route exact path="/client/setListApproval" component={ClientSetListApprovalPage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        fireEvent.change(screen.getByTestId("Add CommentsTextInput"), {target : {value : "No Music"}});

        expect(screen.getByTestId("Add CommentsTextInput").value).toEqual("No Music");
    });

    test("Send Client Comments and Approval redirects to client home when succesful", () => {

    });

    test("Send Client Comments and Approval error message appears when error occurs", () => {

    });
});