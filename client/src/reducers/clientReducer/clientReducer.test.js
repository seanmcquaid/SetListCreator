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
    SEND_CLIENT_SETLIST_SUCCESS,
    SEND_CLIENT_SETLIST_LOADING,
    SEND_CLIENT_SETLIST_ERROR,
} from "actions/clientActions/clientActionTypes";
import {LOGIN_SUCCESS, LOGOUT_SUCCESS} from "actions/authActions/authActionTypes";
import clientReducer from "./clientReducer";

describe("clientReducer", () => {
    const initialState = {
        bandleader : "",
        doNotPlaySongsList : [],
        requestedSongsList : [],
        isLoading : false,
        setListAvailable : false,
        clientApproved : false
    };

    describe("LOADING", () => {
        test("GET_CLIENT_SONGS_LOADING", () => {
            const action = {
                type : GET_CLIENT_SONGS_LOADING,
            };

            const expectedResult = {
                bandleader : "",
                doNotPlaySongsList : [],
                requestedSongsList : [],
                isLoading : true,
                setListAvailable : false,
                clientApproved : false
            };

            expect(clientReducer(initialState, action)).toEqual(expectedResult);
        });

        test("ADD_CLIENT_REQUESTED_SONG_LOADING", () => {
            const action = {
                type : ADD_CLIENT_REQUESTED_SONG_LOADING,
            };

            const expectedResult = {
                bandleader : "",
                doNotPlaySongsList : [],
                requestedSongsList : [],
                isLoading : true,
                setListAvailable : false,
                clientApproved : false
            };

            expect(clientReducer(initialState, action)).toEqual(expectedResult);
        });

        test("ADD_CLIENT_DO_NOT_PLAY_SONG_LOADING", () => {
            const action = {
                type : ADD_CLIENT_DO_NOT_PLAY_SONG_LOADING,
            };

            const expectedResult = {
                bandleader : "",
                doNotPlaySongsList : [],
                requestedSongsList : [],
                isLoading : true,
                setListAvailable : false,
                clientApproved : false
            };

            expect(clientReducer(initialState, action)).toEqual(expectedResult);
        });

        test("DELETE_CLIENT_SONG_LOADING", () => {
            const action = {
                type : DELETE_CLIENT_SONG_LOADING,
            };

            const expectedResult = {
                bandleader : "",
                doNotPlaySongsList : [],
                requestedSongsList : [],
                isLoading : true,
                setListAvailable : false,
                clientApproved : false
            };

            expect(clientReducer(initialState, action)).toEqual(expectedResult);
        });

        test("EDIT_CLIENT_SONG_LOADING", () => {
            const action = {
                type : EDIT_CLIENT_SONG_LOADING,
            };

            const expectedResult = {
                bandleader : "",
                doNotPlaySongsList : [],
                requestedSongsList : [],
                isLoading : true,
                setListAvailable : false,
                clientApproved : false
            };

            expect(clientReducer(initialState, action)).toEqual(expectedResult);
        });

        test("SEND_CLIENT_SETLIST_LOADING", () => {
            const action = {
                type : SEND_CLIENT_SETLIST_LOADING,
            };

            const expectedResult = {
                bandleader : "",
                doNotPlaySongsList : [],
                requestedSongsList : [],
                isLoading : true,
                setListAvailable : false,
                clientApproved : false
            };

            expect(clientReducer(initialState, action)).toEqual(expectedResult);
        });
    });

    describe("SUCCESS - Return all state modified", () => {
        const payload = {
            requestedSongsList : ["requestedSongsHere"],
            doNotPlaySongsList : ["doNotPlaySongsHere"],
            setListAvailable : true,
            clientApproved : true,
            isLoading : false,
        };

        test("GET_CLIENT_SONGS_SUCCESS", () => {
            const action = {
                type : GET_CLIENT_SONGS_SUCCESS,
                payload,
            };

            const expectedResult = {
                bandleader : "",
                requestedSongsList : ["requestedSongsHere"],
                doNotPlaySongsList : ["doNotPlaySongsHere"],
                setListAvailable : true,
                clientApproved : true,
                isLoading : false,
            };

            expect(clientReducer(initialState, action)).toEqual(expectedResult);
        });

        test("ADD_CLIENT_REQUESTED_SONG_SUCCESS", () => {
            const action = {
                type : ADD_CLIENT_REQUESTED_SONG_SUCCESS,
                payload,
            };

            const expectedResult = {
                bandleader : "",
                requestedSongsList : ["requestedSongsHere"],
                doNotPlaySongsList : ["doNotPlaySongsHere"],
                setListAvailable : true,
                clientApproved : true,
                isLoading : false,
            };

            expect(clientReducer(initialState, action)).toEqual(expectedResult);
        });

        test("ADD_CLIENT_DO_NOT_PLAY_SONG_SUCCESS", () => {
            const action = {
                type : ADD_CLIENT_DO_NOT_PLAY_SONG_SUCCESS,
                payload,
            };

            const expectedResult = {
                bandleader : "",
                requestedSongsList : ["requestedSongsHere"],
                doNotPlaySongsList : ["doNotPlaySongsHere"],
                setListAvailable : true,
                clientApproved : true,
                isLoading : false,
            };

            expect(clientReducer(initialState, action)).toEqual(expectedResult);
        });

        test("DELETE_CLIENT_SONG_SUCCESS", () => {
            const action = {
                type : DELETE_CLIENT_SONG_SUCCESS,
                payload,
            };

            const expectedResult = {
                bandleader : "",
                requestedSongsList : ["requestedSongsHere"],
                doNotPlaySongsList : ["doNotPlaySongsHere"],
                setListAvailable : true,
                clientApproved : true,
                isLoading : false,
            };

            expect(clientReducer(initialState, action)).toEqual(expectedResult);
        });

        test("EDIT_CLIENT_SONG_SUCCESS", () => {
            const action = {
                type : EDIT_CLIENT_SONG_SUCCESS,
                payload,
            };

            const expectedResult = {
                bandleader : "",
                requestedSongsList : ["requestedSongsHere"],
                doNotPlaySongsList : ["doNotPlaySongsHere"],
                setListAvailable : true,
                clientApproved : true,
                isLoading : false,
            };

            expect(clientReducer(initialState, action)).toEqual(expectedResult);
        });
    });

    describe("SUCCESS - Return SetListAvailable modified", () => {
        const payload = {
            setListAvailable : true,
        };

        test("SEND_CLIENT_SETLIST_SUCCESS", () => {
            const action = {
                type : SEND_CLIENT_SETLIST_SUCCESS,
                payload,
            };

            const expectedResult = {
                bandleader : "",
                requestedSongsList : [],
                doNotPlaySongsList : [],
                setListAvailable : true,
                clientApproved : false,
                isLoading : false,
            };

            expect(clientReducer(initialState, action)).toEqual(expectedResult);
        });

        test("LOGIN_SUCCESS", () => {
            const action = {
                type : LOGIN_SUCCESS,
                payload,
            };

            const expectedResult = {
                bandleader : "",
                requestedSongsList : [],
                doNotPlaySongsList : [],
                setListAvailable : true,
                clientApproved : false,
                isLoading : false,
            };

            expect(clientReducer(initialState, action)).toEqual(expectedResult);
        });
    });
});