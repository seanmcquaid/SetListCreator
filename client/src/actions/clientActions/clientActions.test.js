import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import ReduxThunk from "redux-thunk";
import { configureMockStore } from "@jedmao/redux-mock-store";
import {
    GET_CLIENT_SONGS_LOADING,
    GET_CLIENT_SONGS_SUCCESS,
    GET_CLIENT_SONGS_ERROR,
    ADD_CLIENT_REQUESTED_SONG_LOADING,
    ADD_CLIENT_REQUESTED_SONG_SUCCESS,
    ADD_CLIENT_REQUESTED_SONG_ERROR,
    ADD_CLIENT_DO_NOT_PLAY_SONG_LOADING,
    ADD_CLIENT_DO_NOT_PLAY_SONG_SUCCESS,
    ADD_CLIENT_DO_NOT_PLAY_SONG_ERROR,
    DELETE_CLIENT_SONG_LOADING,
    DELETE_CLIENT_SONG_SUCCESS,
    DELETE_CLIENT_SONG_ERROR,
    EDIT_CLIENT_SONG_LOADING,
    EDIT_CLIENT_SONG_SUCCESS,
    EDIT_CLIENT_SONG_ERROR,
    SEND_CLIENT_SETLIST_ERROR,
    SEND_CLIENT_SETLIST_SUCCESS,
    SEND_CLIENT_SETLIST_LOADING,
} from "./clientActionTypes";
import {apiHost} from "config";
import { getClientSongsAction, addClientRequestedSongAction, addClientDoNotPlaySongAction } from "./clientActions";

describe("clientActions", () => {
    const mockAxios = new AxiosMockAdapter(axios, {delayResponse : Math.random() * 10});

    const middleware = [ReduxThunk];
    const mockStore = configureMockStore(middleware);

    describe("getClientSongsAction", () => {
        beforeEach(() => {
            localStorage.setItem("token", "token")
        });

        test("getClientSongsAction - success", () => {
            const store = mockStore();

            const payload = {
                doNotPlaySongsList : [],
                requestedSongsList : [],
                setListAvailable : false,
                clientApproved : false,
            };

            mockAxios.onGet(`${apiHost}/client/getSongs`).reply(200, payload);

            const expectedActions = [
                {
                    type : GET_CLIENT_SONGS_LOADING,
                },
                {
                    type : GET_CLIENT_SONGS_SUCCESS,
                    payload,
                }
            ];

            return store.dispatch(getClientSongsAction()).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        test("getClientSongsAction - error", () => {
            const store = mockStore();

            const payload = {
                errorMessage : "error",
            };

            mockAxios.onGet(`${apiHost}/client/getSongs`).reply(401, payload);

            const expectedActions = [
                {
                    type : GET_CLIENT_SONGS_LOADING,
                },
                {
                    type : GET_CLIENT_SONGS_ERROR,
                    payload,
                }
            ];

            return store.dispatch(getClientSongsAction()).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        afterEach(() => {
            localStorage.removeItem("token");
        });
    });

    describe("addClientRequestedSongAction", () => {
        beforeEach(() => {
            localStorage.setItem("token", "token")
        });

        test("addClientRequestedSongAction - success", () => {
            const store = mockStore();

            const songName = "Uptown Funk";
            const artistName = "Bruno Mars";

            const payload = {
                doNotPlaySongsList : [],
                requestedSongsList : [
                    {
                        songName,
                        artistName,
                    }
                ],
                setListAvailable : false,
                clientApproved : false,
            };

            mockAxios.onPost(`${apiHost}/client/addSong/requestedSong`).reply(200, payload);

            const expectedActions = [
                {
                    type : ADD_CLIENT_REQUESTED_SONG_LOADING,
                },
                {
                    type : ADD_CLIENT_REQUESTED_SONG_SUCCESS,
                    payload,
                }
            ];

            return store.dispatch(addClientRequestedSongAction(songName, artistName)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        test("addClientRequestedSongAction - error", () => {
            const store = mockStore();

            const songName = "Uptown Funk";
            const artistName = "Bruno Mars";

            const payload = {
                errorMessage : "error",
            };

            mockAxios.onPost(`${apiHost}/client/addSong/requestedSong`).reply(401, payload);

            const expectedActions = [
                {
                    type : ADD_CLIENT_REQUESTED_SONG_LOADING,
                },
                {
                    type : ADD_CLIENT_REQUESTED_SONG_ERROR,
                    payload,
                }
            ];

            return store.dispatch(addClientRequestedSongAction(songName, artistName)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        afterEach(() => {
            localStorage.removeItem("token");
        });
    });

    describe("addClientDoNotPlaySongAction", () => {
        beforeEach(() => {
            localStorage.setItem("token", "token")
        });

        test("addClientDoNotPlaySongAction - success", () => {
            const store = mockStore();

            const songName = "Uptown Funk";
            const artistName = "Bruno Mars";

            const payload = {
                doNotPlaySongsList : [
                    {
                        songName,
                        artistName,
                    }
                ],
                requestedSongsList : [],
                setListAvailable : false,
                clientApproved : false,
            };

            mockAxios.onPost(`${apiHost}/client/addSong/doNotPlaySong`).reply(200, payload);

            const expectedActions = [
                {
                    type : ADD_CLIENT_DO_NOT_PLAY_SONG_LOADING,
                },
                {
                    type : ADD_CLIENT_DO_NOT_PLAY_SONG_SUCCESS,
                    payload,
                }
            ];

            return store.dispatch(addClientDoNotPlaySongAction(songName, artistName)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        test("addClientDoNotPlaySongAction - error", () => {
            const store = mockStore();

            const songName = "Uptown Funk";
            const artistName = "Bruno Mars";

            const payload = {
                errorMessage : "error",
            };

            mockAxios.onPost(`${apiHost}/client/addSong/doNotPlaySong`).reply(401, payload);

            const expectedActions = [
                {
                    type : ADD_CLIENT_DO_NOT_PLAY_SONG_LOADING,
                },
                {
                    type : ADD_CLIENT_DO_NOT_PLAY_SONG_ERROR,
                    payload,
                }
            ];

            return store.dispatch(addClientDoNotPlaySongAction(songName, artistName)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        afterEach(() => {
            localStorage.removeItem("token");
        });
    });
});