import React from "react";
import BandleaderEditSongPage from "./BandleaderEditSongPage";
import configureStore from "store/configureStore";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import MockRouter from "testUtils/MockRouter";
import { Route } from "react-router-dom";
import axios from "axios";
import AddSongsPage from "../AddSongsPage/AddSongsPage";

describe("<BandleaderEditSongPage/>", () => {

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
                songkey : "D Minor",
            },
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getSongResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/bandleader/editSong/1">
                    <Route exact path="/bandleader/editSong/:songId" component={BandleaderEditSongPage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());
    });

    test("Song Info Displays After Loading Spinner", async () => {
        const getSongResponse = {
            songInfo : {
                songname : "Uptown Funk",
                artistname : "Bruno Mars",
                songkey : "D Minor",
            },
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getSongResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/bandleader/editSong/1">
                    <Route exact path="/bandleader/editSong/:songId" component={BandleaderEditSongPage}/>
                </MockRouter>
            </Provider>
        );

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        expect(screen.getByTestId("Song NameTextInput").value).toEqual("Uptown Funk");

        expect(screen.getByTestId("Artist NameTextInput").value).toEqual("Bruno Mars");

        expect(screen.getByTestId("KeyTextInput").value).toEqual("D Minor");
    });

    test("Song Info Load Error Displays", async () => {
        const getSongResponse = {
            errorMessage : "Error here",
        };

        jest.spyOn(axios, "get").mockRejectedValueOnce({response : {data : {...getSongResponse}}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/bandleader/editSong/1">
                    <Route exact path="/bandleader/editSong/:songId" component={BandleaderEditSongPage}/>
                </MockRouter>
            </Provider>
        );

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        expect(screen.getByText("Error here")).toBeInTheDocument();
    });

    test("Edit Song submit with new information redirects the user to the add songs page and sees the edited song", async () => {
        const getSongResponse = {
            songInfo : {
                songname : "Uptown Funk",
                artistname : "Bruno Mars",
                songkey : "D Minor",
            },
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getSongResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/bandleader/editSong/1">
                    <Route exact path="/bandleader/editSong/:songId" component={BandleaderEditSongPage}/>
                    <Route exact path="/bandleader/addSongs" component={AddSongsPage}/>
                </MockRouter>
            </Provider>
        );

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        fireEvent.change(screen.getByTestId("Song NameTextInput"), {target : {value : "Treasure"}});
        expect(screen.getByTestId("Song NameTextInput").value).toEqual("Treasure");

        fireEvent.change(screen.getByTestId("Artist NameTextInput"), {target : {value : "Bruno Mars"}});
        expect(screen.getByTestId("Artist NameTextInput").value).toEqual("Bruno Mars");

        fireEvent.change(screen.getByTestId("KeyTextInput"), {target : {value : "F Major"}});
        expect(screen.getByTestId("KeyTextInput").value).toEqual("F Major");

        const editBandleaderSongActionResponse = {
            songList : [
                {
                    songname : "Treasure",
                    artistname : "Bruno Mars",
                    songkey : "F Major",
                    id : 1,
                }
            ],
        };

        jest.spyOn(axios, "patch").mockResolvedValueOnce({data : {...editBandleaderSongActionResponse}});

        fireEvent.click(screen.getByTestId("Edit SongButton"));

        const getBandleaderSongsActionResponse = {
            songList : [
                {
                    songname : "Treasure",
                    artistname : "Bruno Mars",
                    songkey : "F Major",
                    id : 1,
                }
            ],
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getBandleaderSongsActionResponse}});

        await waitFor(() => expect(screen.getByText("Song List")).toBeInTheDocument());

        expect(screen.getByText("Treasure")).toBeInTheDocument()
    });
});