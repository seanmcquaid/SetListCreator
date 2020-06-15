import {selectErrorState} from "./errorSelectors";

describe("errorSelectors", () => {
    test("Returns only error state", () => {
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
            error : {
                errorMessage : "ERROR MESSAGE"
            },
        };

        const expectedResult = {
            ...state.error,
        };

        expect(selectErrorState(state)).toEqual(expectedResult);
    });
});