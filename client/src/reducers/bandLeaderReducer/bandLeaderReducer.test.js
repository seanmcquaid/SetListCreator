import {
    ADD_BANDLEADER_SONG_LOADING,
    ADD_BANDLEADER_SONG_SUCCESS,
    ADD_BANDLEADER_SONG_ERROR,
    EDIT_BANDLEADER_SONG_LOADING,
    EDIT_BANDLEADER_SONG_ERROR,
    EDIT_BANDLEADER_SONG_SUCCESS,
    GET_BANDLEADER_SONGS_LOADING,
    GET_BANDLEADER_SONGS_SUCCESS,
    GET_BANDLEADER_SONGS_ERROR,
    GET_BANDLEADER_CLIENTS_LOADING,
    GET_BANDLEADER_CLIENTS_SUCCESS,
    GET_BANDLEADER_CLIENTS_ERROR,
    DELETE_BANDLEADER_SONG_LOADING,
    DELETE_BANDLEADER_SONG_SUCCESS,
    DELETE_BANDLEADER_SONG_ERROR,
} from "actions/bandleaderActions/bandleaderActionTypes";
import { LOGOUT_SUCCESS } from "actions/authActions/authActionTypes";
import bandleaderReducer from "./band;eaderReducer";

describe("bandleaderReducer", () => {

    const initialState = {
        clientList : [],
        songList : [],
        isLoading : false,
    };
    describe("LOADING", () => {
        test("ADD_BANDLEADER_SONG_LOADING", () => {
            const action = {
                type : ADD_BANDLEADER_SONG_LOADING,
            };

            const expectedResult = {
                clientList : [],
                songList : [],
                isLoading : true,
            };

            expect(bandleaderReducer(initialState, action)).toEqual(expectedResult);
        });

        test("GET_BANDLEADER_SONGS_LOADING", () => {
            const action = {
                type : GET_BANDLEADER_SONGS_LOADING,
            };

            const expectedResult = {
                clientList : [],
                songList : [],
                isLoading : true,
            };

            expect(bandleaderReducer(initialState, action)).toEqual(expectedResult);
        });

        test("DELETE_BANDLEADER_SONG_LOADING", () => {
            const action = {
                type : DELETE_BANDLEADER_SONG_LOADING,
            };

            const expectedResult = {
                clientList : [],
                songList : [],
                isLoading : true,
            };

            expect(bandleaderReducer(initialState, action)).toEqual(expectedResult);
        });

        test("EDIT_BANDLEADER_SONG_LOADING", () => {
            const action = {
                type : EDIT_BANDLEADER_SONG_LOADING,
            };

            const expectedResult = {
                clientList : [],
                songList : [],
                isLoading : true,
            };

            expect(bandleaderReducer(initialState, action)).toEqual(expectedResult);
        });

        test("GET_BANDLEADER_CLIENTS_LOADING", () => {
            const action = {
                type : GET_BANDLEADER_CLIENTS_LOADING,
            };

            const expectedResult = {
                clientList : [],
                songList : [],
                isLoading : true,
            };

            expect(bandleaderReducer(initialState, action)).toEqual(expectedResult);
        });
    });

    describe("SUCCESS - SongList", () => {
        test("ADD_BANDLEADER_SONG_SUCCESS", () => {
            const action = {
                type : ADD_BANDLEADER_SONG_SUCCESS,
                payload : {
                    songList : ["Songs", "Here"],
                },
            };

            const expectedResult = {
                clientList : [],
                songList : ["Songs", "Here"],
                isLoading : false,
            };

            expect(bandleaderReducer(initialState, action)).toEqual(expectedResult);
        });

        test("GET_BANDLEADER_SONGS_SUCCESS", () => {
            const action = {
                type : GET_BANDLEADER_SONGS_SUCCESS,
                payload : {
                    songList : ["Songs", "Here"],
                },
            };

            const expectedResult = {
                clientList : [],
                songList : ["Songs", "Here"],
                isLoading : false,
            };

            expect(bandleaderReducer(initialState, action)).toEqual(expectedResult);
        });

        test("DELETE_BANDLEADER_SONG_SUCCESS", () => {
            const action = {
                type : DELETE_BANDLEADER_SONG_SUCCESS,
                payload : {
                    songList : ["Songs", "Here"],
                },
            };

            const expectedResult = {
                clientList : [],
                songList : ["Songs", "Here"],
                isLoading : false,
            };

            expect(bandleaderReducer(initialState, action)).toEqual(expectedResult);
        });

        test("EDIT_BANDLEADER_SONG_SUCCESS", () => {
            const action = {
                type : EDIT_BANDLEADER_SONG_SUCCESS,
                payload : {
                    songList : ["Songs", "Here"],
                },
            };

            const expectedResult = {
                clientList : [],
                songList : ["Songs", "Here"],
                isLoading : false,
            };

            expect(bandleaderReducer(initialState, action)).toEqual(expectedResult);
        });
    });

    test("GET_BANDLEADER_CLIENTS_SUCCESS", () => {
        const action = {
            type : GET_BANDLEADER_CLIENTS_SUCCESS,
            payload : {
                clientList : ["Client", "Here"],
            },
        };

        const expectedResult = {
            clientList : ["Client", "Here"],
            songList : [],
            isLoading : false,
        };

        expect(bandleaderReducer(initialState, action)).toEqual(expectedResult);
    });

    describe("ERROR", () => {
        test("ADD_BANDLEADER_SONG_ERROR", () => {
            const action = {
                type : ADD_BANDLEADER_SONG_ERROR,
            };

            const expectedResult = {
                clientList : [],
                songList : [],
                isLoading : false,
            };

            expect(bandleaderReducer(initialState, action)).toEqual(expectedResult);
        });

        test("GET_BANDLEADER_SONGS_ERROR", () => {
            const action = {
                type : GET_BANDLEADER_SONGS_ERROR,
            };

            const expectedResult = {
                clientList : [],
                songList : [],
                isLoading : false,
            };

            expect(bandleaderReducer(initialState, action)).toEqual(expectedResult);
        });

        test("DELETE_BANDLEADER_SONG_ERROR", () => {
            const action = {
                type : DELETE_BANDLEADER_SONG_ERROR,
            };

            const expectedResult = {
                clientList : [],
                songList : [],
                isLoading : false,
            };

            expect(bandleaderReducer(initialState, action)).toEqual(expectedResult);
        });

        test("EDIT_BANDLEADER_SONG_ERROR", () => {
            const action = {
                type : EDIT_BANDLEADER_SONG_ERROR,
            };

            const expectedResult = {
                clientList : [],
                songList : [],
                isLoading : false,
            };

            expect(bandleaderReducer(initialState, action)).toEqual(expectedResult);
        });

        test("GET_BANDLEADER_CLIENTS_ERROR", () => {
            const action = {
                type : GET_BANDLEADER_CLIENTS_ERROR,
            };

            const expectedResult = {
                clientList : [],
                songList : [],
                isLoading : false,
            };

            expect(bandleaderReducer(initialState, action)).toEqual(expectedResult);
        });
    });

    test("LOGOUT_SUCCESS", () => {
        const action = {
            type : LOGOUT_SUCCESS,
        };

        expect(bandleaderReducer(initialState, action)).toEqual(initialState);
    });

    test("Default", () => {
        const action = {
            type : "DEFAULT",
        };

        const expectedResult = {
            clientList : [],
            songList : [],
            isLoading : false,
        };

        expect(bandleaderReducer(initialState, action)).toEqual(expectedResult);
    });

});