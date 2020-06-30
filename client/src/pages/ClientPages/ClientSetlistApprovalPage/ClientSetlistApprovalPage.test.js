import React from "react";
import ClientSetListApprovalPage from "./ClientSetListApprovalPage";
import configureStore from "store/configureStore";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import MockRouter from "testUtils/MockRouter";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import axios from "axios";
import ClientHomePage from "../ClientHomePage/ClientHomePage";
import { act } from "react-dom/test-utils";

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

    test("Send Client Comments and Approval redirects to client home when succesful", async () => {
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
                    <Route exact path="/clientHome" component={ClientHomePage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        fireEvent.change(screen.getByTestId("Is This Approved?Dropdown"), {target : {value : "Yes"}});
        expect(screen.getByTestId("Is This Approved?Dropdown").value).toEqual("Yes");

        fireEvent.change(screen.getByTestId("Add CommentsTextInput"), {target : {value : "No Music"}});
        expect(screen.getByTestId("Add CommentsTextInput").value).toEqual("No Music");

        fireEvent.click(screen.getByTestId("Add CommentButton"));

        expect(screen.getByTestId("Add CommentsTextInput").value).toEqual("");

        jest.spyOn(axios, "patch").mockResolvedValueOnce();

        const getClientSongsActionResponse = {
            doNotPlaySongsList : [],
            requestedSongsList : [
                {
                    songname : "Uptown Funk",
                    artistname : "Bruno Mars",
                    id : 1,
                }
            ],
            setListAvailable : true,
            clientApproved : true,
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getClientSongsActionResponse}});

        fireEvent.click(screen.getByTestId("Send Comments And ApprovalButton"));

        await waitFor(() => expect(screen.queryByText("loadingSpinner")).toBeNull());

        await waitFor(() => expect(screen.getByText("Client Home Page")).toBeInTheDocument());
    });

    test("Send Client Comments and Approval error message appears when error occurs", async () => {
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

        fireEvent.change(screen.getByTestId("Is This Approved?Dropdown"), {target : {value : "Yes"}});
        expect(screen.getByTestId("Is This Approved?Dropdown").value).toEqual("Yes");

        fireEvent.change(screen.getByTestId("Add CommentsTextInput"), {target : {value : "No Music"}});
        expect(screen.getByTestId("Add CommentsTextInput").value).toEqual("No Music");

        fireEvent.click(screen.getByTestId("Add CommentButton"));

        expect(screen.getByTestId("Add CommentsTextInput").value).toEqual("");

        const editCompletedSetListCommentsResponse = {
            errorMessage : "Error Message Here Now",
        };

        jest.spyOn(axios, "patch").mockRejectedValueOnce({
            response : {
                data : {
                    ...editCompletedSetListCommentsResponse
                },
            },
        });

        fireEvent.click(screen.getByTestId("Send Comments And ApprovalButton"));

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull())
    });
});