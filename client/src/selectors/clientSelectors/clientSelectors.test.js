import { selectClientState } from "./clientSelectors";

describe("clientSelectors", () => {
  test("Returns only client state", () => {
    const state = {
      auth: {
        username: "TEST",
      },
      bandleader: {
        clientList: ["CLIENTS", "HERE"],
      },
      client: {
        bandleaderName: "NAME",
      },
      error: {
        errorMessage: "ERROR MESSAGE",
      },
    };

    const expectedResult = {
      ...state.client,
    };

    expect(selectClientState(state)).toEqual(expectedResult);
  });
});
