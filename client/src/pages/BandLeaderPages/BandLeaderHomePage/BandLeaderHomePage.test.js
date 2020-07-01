import React from "react";
import BandleaderHomePage from "./BandleaderHomePage";
import configureStore from "store/configureStore";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import BandleaderProfilePage from "../BandleaderProfilePage/BandleaderProfilePage";
import { Provider } from "react-redux";
import MockRouter from "testUtils/MockRouter";
import { Route } from "react-router-dom";
import axios from "axios";
import ClientListPage from "../ClientListPage/ClientListPage";
import AddSongsPage from "../AddSongsPage/AddSongsPage";

describe("<BandleaderHomePage/>", () => {
    
    test("Edit Profile button goes to correct page", async () => {
        const store = configureStore();
        
        render(
            <Provider store={store}>
                <MockRouter initialRoute="/bandleaderHome">
                    <Route exact path="/bandleaderHome" component={BandleaderHomePage}/>
                    <Route exact path="/bandleader/editProfile" component={BandleaderProfilePage}/>
                </MockRouter>
            </Provider>
        );

        const getUserInfoActionResponse = {
            isAuthenticated : true,
            token : "testToken",
            username : "test user",
            accountType : "client",
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : { ...getUserInfoActionResponse}});

        fireEvent.click(screen.getByText("Edit Profile"));

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        expect(screen.getByText("Profile Page")).toBeInTheDocument();
    });

    test("Client List button goes to correct page", async () => {
        const store = configureStore();
        
        render(
            <Provider store={store}>
                <MockRouter initialRoute="/bandleaderHome">
                    <Route exact path="/bandleaderHome" component={BandleaderHomePage}/>
                    <Route exact path="/bandLeader/clientList" component={ClientListPage}/>
                </MockRouter>
            </Provider>
        );

        const getBandleaderClientsActionResponse = {
            clientList : [],
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getBandleaderClientsActionResponse}});

        fireEvent.click(screen.getByText("Client List"));

        await waitFor(() => expect(screen.getByText("Clients Page")).toBeInTheDocument());
    });


    test("Add Songs To Your Database button goes to correct page", async () => {
        const store = configureStore();
        
        render(
            <Provider store={store}>
                <MockRouter initialRoute="/bandleaderHome">
                    <Route exact path="/bandleaderHome" component={BandleaderHomePage}/>
                    <Route exact path="/bandleader/addSongs" component={AddSongsPage}/>
                </MockRouter>
            </Provider>
        );

        const getBandleaderClientsActionResponse = {
            songList : [],
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getBandleaderClientsActionResponse}});

        fireEvent.click(screen.getByText("Add Songs To Your Database"));

        await waitFor(() => expect(screen.getByText("Song List")).toBeInTheDocument());
    });

});