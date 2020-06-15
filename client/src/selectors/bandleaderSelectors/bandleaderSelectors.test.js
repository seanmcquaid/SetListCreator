import {selectBandleaderState} from "./bandleaderSelectors";

describe("bandleaderSelectors", () => {
    test("Returns only bandleader state", () => {
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
            ...state.bandleader,
        };

        expect(selectBandleaderState(state)).toEqual(expectedResult);
    });
});