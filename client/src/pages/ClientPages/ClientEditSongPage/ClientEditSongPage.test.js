import React from "react";
import ClientEditSongPage from "./ClientEditSongPage";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import configureStore from "store/configureStore";
import axios from "axios";
import { Provider } from "react-redux";
import MockRouter from "testUtils/MockRouter";
import { Route } from "react-router-dom";
import ClientHomePage from "../ClientHomePage/ClientHomePage";

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
            errorMessage : "There was a problem getting the song info"
        }

        jest.spyOn(axios, "get").mockRejectedValueOnce({
            response : {
                data : {
                    ...getSongResponse,
                },
            },
        });

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

        expect(screen.getByText("There was a problem getting the song info")).toBeInTheDocument();
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
                    <Route exact path="/clientHome" component={ClientHomePage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        fireEvent.change(screen.getByTestId("Song NameTextInput"), {target : {value : "Treasure"}});
        expect(screen.getByTestId("Song NameTextInput").value).toEqual("Treasure");

        fireEvent.change(screen.getByTestId("Artist NameTextInput"), {target : {value : "Bruno Mars"}});
        expect(screen.getByTestId("Artist NameTextInput").value).toEqual("Bruno Mars");

        fireEvent.change(screen.getByTestId("Song TypeDropdown"), {target : {value : "requestedSong"}});
        expect(screen.getByTestId("Song TypeDropdown").value).toEqual("requestedSong");

        const editClientSongActionResponse = {
            doNotPlaySongsList : [],
            requestedSongsList : [
                {
                    songname : "Treasure",
                    artistname : "Bruno Mars",
                    id : 1,
                }
            ],
            setListAvailable : false,
            clientApproved : false,
        }

        jest.spyOn(axios, "patch").mockResolvedValueOnce({data : {...editClientSongActionResponse}});

        const getClientSongsActionResponse = {
            doNotPlaySongsList : [],
            requestedSongsList : [
                {
                    songname : "Treasure",
                    artistname : "Bruno Mars",
                    id : 1,
                }
            ],
            setListAvailable : false,
            clientApproved : false,
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getClientSongsActionResponse}});

        fireEvent.click(screen.getByTestId("Submit Edited SongButton"));

        await waitFor(() => expect(screen.getByText("Musical Preferences Page")).toBeInTheDocument());

        expect(screen.getByText("Treasure")).toBeInTheDocument();
    });
});