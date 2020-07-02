import React from "react";
import configureStore from "store/configureStore";
import { render, screen, waitFor } from "@testing-library/react";
import { Route } from "react-router-dom";
import { Provider } from "react-redux";
import MockRouter from "testUtils/MockRouter";
import AddSongsPage from "./AddSongsPage";
import axios from "axios";

describe("Add Songs Page", () => {

    test("Songs previously added load", async () => {

        const getBandleaderSongsActionResponse = {
            songList : [
                {
                    songname : "Uptown Funk", 
                    artistname : "Bruno Mars",
                    songkey : "D Minor",
                    id : 1
                }
            ],
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getBandleaderSongsActionResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/bandleader/addSongs">
                    <Route exact path="/bandleader/addSongs" component={AddSongsPage}/>
                </MockRouter>
            </Provider>
        );

        await waitFor(() => expect(screen.getByText("Uptown Funk")).toBeInTheDocument());
    });
    
    test("Added song displays", () => {
        const getBandleaderSongsActionResponse = {
            songList : [
                {
                    songname : "Uptown Funk", 
                    artistname : "Bruno Mars",
                    songkey : "D Minor",
                    id : 1
                }
            ],
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getBandleaderSongsActionResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/bandleader/addSongs">
                    <Route exact path="/bandleader/addSongs" component={AddSongsPage}/>
                </MockRouter>
            </Provider>
        );
    });

    test("Deleted song is no longer displayed", () => {

    });
});