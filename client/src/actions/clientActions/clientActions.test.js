import axios from "axios";
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
import { getClientSongsAction, addClientRequestedSongAction, addClientDoNotPlaySongAction, deleteClientSongAction, editClientSongAction, sendClientSetListAction } from "./clientActions";

describe("clientActions", () => {
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

            jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...payload}});

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

            jest.spyOn(axios, "get").mockRejectedValueOnce({response : {data : {...payload}}});

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

            jest.spyOn(axios, "post").mockResolvedValueOnce({data : {...payload}});

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

            jest.spyOn(axios, "post").mockRejectedValueOnce({response : {data : {...payload}}});

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

            jest.spyOn(axios, "post").mockResolvedValueOnce({data : {...payload}});

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

            jest.spyOn(axios, "post").mockRejectedValueOnce({response : {data : {...payload}}});

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

    describe("deleteClientSongAction", () => {
        beforeEach(() => {
            localStorage.setItem("token", "token")
        });

        test("deleteClientSongAction - success", () => {
            const store = mockStore();

            const songId = 1;

            const payload = {
                doNotPlaySongsList : [],
                requestedSongsList : [],
                setListAvailable : false,
                clientApproved : false,
            };

            jest.spyOn(axios, "delete").mockResolvedValueOnce({data : {...payload}});

            const expectedActions = [
                {
                    type : DELETE_CLIENT_SONG_LOADING,
                },
                {
                    type : DELETE_CLIENT_SONG_SUCCESS,
                    payload,
                }
            ];

            return store.dispatch(deleteClientSongAction(songId)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        test("deleteClientSongAction - error", () => {
            const store = mockStore();

            const songId = 1;

            const payload = {
                errorMessage : "error",
            };

            jest.spyOn(axios, "delete").mockRejectedValueOnce({response : {data : {...payload}}});

            const expectedActions = [
                {
                    type : DELETE_CLIENT_SONG_LOADING,
                },
                {
                    type : DELETE_CLIENT_SONG_ERROR,
                    payload,
                }
            ];

            return store.dispatch(deleteClientSongAction(songId)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        afterEach(() => {
            localStorage.removeItem("token");
        });
    });

    describe("editClientSongAction", () => {
        beforeEach(() => {
            localStorage.setItem("token", "token")
        });

        test("editClientSongAction - success", () => {
            const store = mockStore();

            const songName = "Uptown Funk";
            const artistName = "Bruno Mars";
            const playListType = "requestedSong";
            const songId = 1;

            const payload = {
                doNotPlaySongsList : [],
                requestedSongsList : [
                    {
                        songId,
                        songName,
                        artistName,
                    }
                ],
                setListAvailable : false,
                clientApproved : false,
            };

            jest.spyOn(axios, "patch").mockResolvedValueOnce({data : {...payload}});

            const expectedActions = [
                {
                    type : EDIT_CLIENT_SONG_LOADING,
                },
                {
                    type : EDIT_CLIENT_SONG_SUCCESS,
                    payload,
                }
            ];

            return store.dispatch(editClientSongAction(songName, artistName, playListType, songId)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        test("editClientSongAction - error", () => {
            const store = mockStore();

            const songName = "Uptown Funk";
            const artistName = "Bruno Mars";
            const playListType = "requestedSong";
            const songId = 1;

            const payload = {
                errorMessage : "error",
            };

            jest.spyOn(axios, "patch").mockRejectedValueOnce({response : {data : {...payload}}});

            const expectedActions = [
                {
                    type : EDIT_CLIENT_SONG_LOADING,
                },
                {
                    type : EDIT_CLIENT_SONG_ERROR,
                    payload,
                }
            ];

            return store.dispatch(editClientSongAction(songName, artistName, playListType, songId)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        afterEach(() => {
            localStorage.removeItem("token");
        });
    });

    describe("sendClientSetListAction", () => {
        beforeEach(() => {
            localStorage.setItem("token", "token")
        });

        test("sendClientSetListAction - success", () => {
            const store = mockStore();

            const setListAvailability = true;

            const payload = {
                setListAvailable : true,
            };

            jest.spyOn(axios, "patch").mockResolvedValueOnce({data : {...payload}});

            const expectedActions = [
                {
                    type : SEND_CLIENT_SETLIST_LOADING,
                },
                {
                    type : SEND_CLIENT_SETLIST_SUCCESS,
                    payload,
                }
            ];

            return store.dispatch(sendClientSetListAction(setListAvailability)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        test("sendClientSetListAction - error", () => {
            const store = mockStore();

            const setListAvailability = true;

            const payload = {
                errorMessage : "error",
            };

            jest.spyOn(axios, "patch").mockRejectedValueOnce({response : {data : {...payload}}});

            const expectedActions = [
                {
                    type : SEND_CLIENT_SETLIST_LOADING,
                },
                {
                    type : SEND_CLIENT_SETLIST_ERROR,
                    payload,
                }
            ];

            return store.dispatch(sendClientSetListAction(setListAvailability)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        afterEach(() => {
            localStorage.removeItem("token");
        });
    });
});