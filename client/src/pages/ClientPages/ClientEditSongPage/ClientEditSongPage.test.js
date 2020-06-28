import React from "react";
import ClientEditSongPage from "./ClientEditSongPage";
import { render, screen, waitFor } from "@testing-library/react";
import configureStore from "store/configureStore";
import axios from "axios";
import { Provider } from "react-redux";
import MockRouter from "testUtils/MockRouter";
import { Route } from "react-router-dom";

describe("<ClientEditSongPage/>", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });
    test("Loading Spinner", async () => {
        const getSongResponse = {
            songInfo : {
                songname : "Uptown Funk",
                artistname : "Bruno Mars",
                songtype : "doNotPlaySong",
            },
        }

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getSongResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/client/editSong/1">
                    <Route exact path="/client/editSong/:songId" component={ClientEditSongPage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

    });

    test("Song Info Loads", async () => {
        const getSongResponse = {
            songInfo : {
                songname : "Uptown Funk",
                artistname : "Bruno Mars",
                songtype : "doNotPlaySong",
            },
        }

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getSongResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/client/editSong/1">
                    <Route exact path="/client/editSong/:songId" component={ClientEditSongPage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        expect(screen.getByTestId("Song NameTextInput").value).toEqual("Uptown Funk");

        expect(screen.getByTestId("Artist NameTextInput").value).toEqual("Bruno Mars");

        expect(screen.getByTestId("Song TypeDropdown").value).toEqual("doNotPlaySong");
    });

    test("Song Info Load Error Displays", async () => {
        const getSongResponse = {
            songInfo : {
                songname : "Uptown Funk",
                artistname : "Bruno Mars",
                songtype : "doNotPlaySong",
            },
        }

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getSongResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/client/editSong/1">
                    <Route exact path="/client/editSong/:songId" component={ClientEditSongPage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());
    });

    test("Edit Song submit with new information redirects the user to the client home and sees the edited song", async () => {
        const getSongResponse = {
            songInfo : {
                songname : "Uptown Funk",
                artistname : "Bruno Mars",
                songtype : "doNotPlaySong",
            },
        }

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getSongResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/client/editSong/1">
                    <Route exact path="/client/editSong/:songId" component={ClientEditSongPage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());
    });
});