import {selectAuthState} from "./authSelectors";

describe("authSelectors", () => {
    test("Returns only auth state", () => {
        const state = {
            auth : {
                username : "TEST"
            },
            bandleader : {
                clientList : ["CLIENTS", "HERE"],
            },
            client : {
                bandleaderName : "NAME"
            },
        };

        const expectedResult = {
            ...state.auth,
        };

        expect(selectAuthState(state)).toEqual(expectedResult);
    });
});