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
import {addBandleaderSongAction, deleteBandleaderSongAction, getBandleaderSongsAction, editBandleaderSongAction, getBandleaderClientsAction} from "./bandleaderActions";

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
        });
    });

    describe("deleteBandleaderSongAction", () => {
        beforeEach(() => {
            localStorage.setItem("token", "token");
        });

        test("deleteBandleaderSongAction - success", () => {
            const store = mockStore();

            const songId = 1;

            const payload = {
                songList : [],
            };

            mockAxios.onDelete(`${apiHost}/bandleader/deleteSong/${songId}`).reply(200, payload);

            const expectedActions = [
                {
                    type : DELETE_BANDLEADER_SONG_LOADING,
                },
                {
                    type : DELETE_BANDLEADER_SONG_SUCCESS,
                    payload,
                }
            ];

            return store.dispatch(deleteBandleaderSongAction(songId)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        test("deleteBandleaderSongAction - error", () => {
            const store = mockStore();

            const songId = 1;

            const payload = {
                errorMessage : "error",
            };

            mockAxios.onDelete(`${apiHost}/bandleader/deleteSong/${songId}`).reply(401, payload);

            const expectedActions = [
                {
                    type : DELETE_BANDLEADER_SONG_LOADING,
                },
                {
                    type : DELETE_BANDLEADER_SONG_ERROR,
                    payload,
                }
            ];

            return store.dispatch(deleteBandleaderSongAction(songId)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        afterEach(() => {
            localStorage.removeItem("token");
        });
    });

    describe("getBandleaderSongsAction", () => {
        beforeEach(() => {
            localStorage.setItem("token", "token");
        });

        test("getBandleaderSongsAction - success", () => {
            const store = mockStore();

            const payload = {
                songList : [
                    {
                        songName : "Uptown Funk",
                        artistName : "Bruno Mars",
                        songKey : "D Minor",
                    }
                ],
            };

            mockAxios.onGet(`${apiHost}/bandleader/getSongs`).reply(200, payload);

            const expectedActions = [
                {
                    type : GET_BANDLEADER_SONGS_LOADING,
                },
                {
                    type : GET_BANDLEADER_SONGS_SUCCESS,
                    payload,
                }
            ];

            return store.dispatch(getBandleaderSongsAction()).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        test("getBandleaderSongsAction - error", () => {
            const store = mockStore();

            const payload = {
                errorMessage : "error"
            };

            mockAxios.onGet(`${apiHost}/bandleader/getSongs`).reply(401, payload);

            const expectedActions = [
                {
                    type : GET_BANDLEADER_SONGS_LOADING,
                },
                {
                    type : GET_BANDLEADER_SONGS_ERROR,
                    payload,
                }
            ];

            return store.dispatch(getBandleaderSongsAction()).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        afterEach(() => {
            localStorage.removeItem("token");
        });
    });

    describe("editBandleaderSongAction", () => {
        beforeEach(() => {
            localStorage.setItem("token", "token");
        });

        test("editBandleaderSongAction - success", () => {
            const store = mockStore();

            const songName = "Uptown Funk";
            const artistName = "Bruno Mars";
            const songKey = "D Minor";
            const songId = 1;

            const payload = {
                songList : [
                    {
                        songName,
                        artistName,
                        songKey,
                        songId,
                    }
                ],
            };

            mockAxios.onPatch(`${apiHost}/bandleader/editSong/${songId}`).reply(200, payload);

            const expectedActions = [
                {
                    type : EDIT_BANDLEADER_SONG_LOADING,
                },
                {
                    type : EDIT_BANDLEADER_SONG_SUCCESS,
                    payload,
                }
            ];

            return store.dispatch(editBandleaderSongAction(songName, artistName, songKey, songId)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        test("editBandleaderSongAction - error", () => {
            const store = mockStore();

            const songName = "Uptown Funk";
            const artistName = "Bruno Mars";
            const songKey = "D Minor";
            const songId = 1;

            const payload = {
                errorMessage : "error",
            };

            mockAxios.onPatch(`${apiHost}/bandleader/editSong/${songId}`).reply(401, payload);

            const expectedActions = [
                {
                    type : EDIT_BANDLEADER_SONG_LOADING,
                },
                {
                    type : EDIT_BANDLEADER_SONG_ERROR,
                    payload,
                }
            ];

            return store.dispatch(editBandleaderSongAction(songName, artistName, songKey, songId)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        afterEach(() => {
            localStorage.removeItem("token");
        });
    });

    describe("getBandleaderClientsAction", () => {
        beforeEach(() => {
            localStorage.setItem("token", "token");
        });

        test("getBandleaderClientsAction - success", () => {
            const store = mockStore();

            const payload = {
                clientList : []
            };

            mockAxios.onGet(`${apiHost}/users/getClientsForBandleader`).reply(200, payload);

            const expectedActions = [
                {
                    type : GET_BANDLEADER_CLIENTS_LOADING,
                },
                {
                    type : GET_BANDLEADER_CLIENTS_SUCCESS,
                    payload,
                }
            ];

            return store.dispatch(getBandleaderClientsAction()).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        test("getBandleaderSongsAction - error", () => {
            const store = mockStore();

            const payload = {
                errorMessage : "error"
            };

            mockAxios.onGet(`${apiHost}/users/getClientsForBandleader`).reply(401, payload);

            const expectedActions = [
                {
                    type : GET_BANDLEADER_CLIENTS_LOADING,
                },
                {
                    type : GET_BANDLEADER_CLIENTS_ERROR,
                    payload,
                }
            ];

            return store.dispatch(getBandleaderClientsAction()).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        afterEach(() => {
            localStorage.removeItem("token");
        });
    });
});