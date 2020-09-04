import { CLEAR_ERROR_MESSAGE } from "./errorActionTypes";
import { clearErrorMessageAction } from "./errorActions";
import ReduxThunk from "redux-thunk";
import { configureMockStore } from "@jedmao/redux-mock-store";

describe("errorActions", () => {
  const middleware = [ReduxThunk];
  const mockStore = configureMockStore(middleware);
  test("clearErrorMessageAction", () => {
    const store = mockStore();

    const expectedActions = [
      {
        type: CLEAR_ERROR_MESSAGE,
      },
    ];

    store.dispatch(clearErrorMessageAction());

    expect(store.getActions()).toEqual(expectedActions);
  });
});
