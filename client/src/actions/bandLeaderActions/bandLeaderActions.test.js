import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import ReduxThunk from "redux-thunk";
import { configureMockStore } from "@jedmao/redux-mock-store";
import {
    ADD_BANDLEADER_SONG_LOADING,
    ADD_BANDLEADER_SONG_SUCCESS,
    ADD_BANDLEADER_SONG_ERROR,
    EDIT_BANDLEADER_SONG_LOADING,
    EDIT_BANDLEADER_SONG_SUCCESS,
    EDIT_BANDLEADER_SONG_ERROR,
    GET_BANDLEADER_SONGS_LOADING,
    GET_BANDLEADER_SONGS_SUCCESS,
    GET_BANDLEADER_SONGS_ERROR,
    GET_BANDLEADER_CLIENTS_LOADING,
    GET_BANDLEADER_CLIENTS_SUCCESS,
    GET_BANDLEADER_CLIENTS_ERROR,
    DELETE_BANDLEADER_SONG_LOADING,
    DELETE_BANDLEADER_SONG_SUCCESS,
    DELETE_BANDLEADER_SONG_ERROR,
} from "./bandleaderActionTypes";
import { apiHost } from "config";
import {addBandleaderSongAction} from "./bandleaderActions";

describe("bandleaderActions", () => {
    const mockAxios = new AxiosMockAdapter(axios, {delayResponse : Math.random() * 10});

    const middleware = [ReduxThunk];
    const mockStore = configureMockStore(middleware);

    describe("addBandleaderSongAction", () => {
        beforeEach(() => {
            localStorage.setItem("token", "token");
        });

        test("addBandleaderSongAction - success", () => {
            const store = mockStore();

            const songName = "Uptown Funk";
            const artistName = "Bruno Mars";
            const songKey = "D Minor";

            const payload = {
                songList : [
                    {
                        songName,
                        artistName,
                        songKey,
                    }
                ],
            };

            mockAxios.onPost(`${apiHost}/bandleader/addSong`).reply(200, payload);

            const expectedActions = [
                {
                    type : ADD_BANDLEADER_SONG_LOADING,
                },
                {
                    type : ADD_BANDLEADER_SONG_SUCCESS,
                    payload,
                }
            ];

            return store.dispatch(addBandleaderSongAction(songName, artistName, songKey)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        test("addBandleaderSongAction - error", () => {
            const store = mockStore();

            const songName = "Uptown Funk";
            const artistName = "Bruno Mars";
            const songKey = "D Minor";

            const payload = {
                errorMessage : "error"
            };

            mockAxios.onPost(`${apiHost}/bandleader/addSong`).reply(401, payload);

            const expectedActions = [
                {
                    type : ADD_BANDLEADER_SONG_LOADING,
                },
                {
                    type : ADD_BANDLEADER_SONG_ERROR,
                    payload,
                }
            ];

            return store.dispatch(addBandleaderSongAction(songName, artistName, songKey)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        afterEach(() => {
            localStorage.removeItem("token");
        })
    });
});