import axios from "axios";
import {
  loginAction,
  registerAction,
  logoutAction,
  tokenConfig,
  checkTokenAction,
  editUserInfoAction,
  getUserInfoAction,
} from "./authActions";
import ReduxThunk from "redux-thunk";
import { configureMockStore } from "@jedmao/redux-mock-store";
import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGOUT_LOADING,
  LOGOUT_SUCCESS,
  CHECK_TOKEN_SUCCESS,
  CHECK_TOKEN_LOADING,
  CHECK_TOKEN_ERROR,
  EDIT_USER_INFO_LOADING,
  EDIT_USER_INFO_SUCCESS,
  EDIT_USER_INFO_ERROR,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_ERROR,
  GET_USER_INFO_LOADING,
} from "./authActionTypes";

describe("authActions", () => {
  const middleware = [ReduxThunk];
  const mockStore = configureMockStore(middleware);

  describe("loginAction", () => {
    test("loginAction - success", () => {
      const store = mockStore();

      const username = "testuser@gmail.com";
      const password = "testpassword";
      const accountType = "client";

      const payload = {
        isAuthenticated: true,
        token: "test token",
        username: "testuser@gmail.com",
        accountType: "client",
        setListAvailable: false,
        selectedBandleader: "testbandleader@gmail.com",
      };

      jest.spyOn(axios, "post").mockResolvedValueOnce({ data: { ...payload } });

      const expectedActions = [
        {
          type: LOGIN_LOADING,
        },
        {
          type: LOGIN_SUCCESS,
          payload,
        },
      ];

      return store
        .dispatch(loginAction(username, password, accountType))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    test("loginAction - error", () => {
      const store = mockStore();

      const username = "testuser@gmail.com";
      const password = "testpassword";
      const accountType = "client";

      const payload = {
        errorMessage: "error",
      };

      jest
        .spyOn(axios, "post")
        .mockRejectedValueOnce({ response: { data: { ...payload } } });

      const expectedActions = [
        {
          type: LOGIN_LOADING,
        },
        {
          type: LOGIN_ERROR,
          payload,
        },
      ];

      return store
        .dispatch(loginAction(username, password, accountType))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe("registerAction", () => {
    test("registerAction - success", () => {
      const store = mockStore();

      const username = "testuser@gmail.com";
      const password = "test123";
      const accountType = "client";
      const selectedBandleader = "testbandleader@gmail.com";

      const payload = {
        isAuthenticated: true,
        token: "test token",
        username: "testuser@gmail.com",
        accountType: "client",
        setListAvailable: false,
        selectedBandleader: "testbandleader@gmail.com",
      };

      jest.spyOn(axios, "post").mockResolvedValueOnce({ data: { ...payload } });

      const expectedActions = [
        {
          type: REGISTER_LOADING,
        },
        {
          type: REGISTER_SUCCESS,
          payload,
        },
      ];

      return store
        .dispatch(
          registerAction(username, password, accountType, selectedBandleader)
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    test("registerAction - error", () => {
      const store = mockStore();

      const username = "testuser@gmail.com";
      const password = "test123";
      const accountType = "client";
      const selectedBandleader = "testbandleader@gmail.com";

      const payload = {
        errorMessage: "error",
      };

      jest
        .spyOn(axios, "post")
        .mockRejectedValueOnce({ response: { data: { ...payload } } });

      const expectedActions = [
        {
          type: REGISTER_LOADING,
        },
        {
          type: REGISTER_ERROR,
          payload,
        },
      ];

      return store
        .dispatch(
          registerAction(username, password, accountType, selectedBandleader)
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  test("logoutAction", () => {
    const store = mockStore();

    const expectedActions = [
      {
        type: LOGOUT_LOADING,
      },
      {
        type: LOGOUT_SUCCESS,
      },
    ];

    store.dispatch(logoutAction());

    expect(store.getActions()).toEqual(expectedActions);
  });

  describe("tokenConfig", () => {
    test("tokenConfig works correctly with valid token", () => {
      localStorage.setItem("token", "token");
      const expectedResult = {
        headers: { "Content-Type": "application/json", Authorization: "token" },
      };

      expect(tokenConfig()).toEqual(expectedResult);
    });

    test("tokenConfig works correctly without valid token", () => {
      const expectedResult = {
        headers: { "Content-Type": "application/json" },
      };

      expect(tokenConfig()).toEqual(expectedResult);
    });

    afterEach(() => {
      localStorage.removeItem("token");
    });
  });

  describe("checkTokenAction", () => {
    beforeEach(() => {
      localStorage.setItem("token", "token");
    });

    test("checkTokenAction - success", () => {
      const store = mockStore();

      const payload = {
        isAuthenticated: true,
        token: "test token",
        username: "testuser@gmail.com",
        accountType: "client",
      };

      jest.spyOn(axios, "get").mockResolvedValueOnce({ data: { ...payload } });

      const expectedActions = [
        {
          type: CHECK_TOKEN_LOADING,
        },
        {
          type: CHECK_TOKEN_SUCCESS,
          payload,
        },
      ];

      return store.dispatch(checkTokenAction()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    test("checkTokenAction - error", () => {
      const store = mockStore();

      const payload = {
        errorMessage: "error",
      };

      jest
        .spyOn(axios, "get")
        .mockRejectedValueOnce({ response: { data: { ...payload } } });

      const expectedActions = [
        {
          type: CHECK_TOKEN_LOADING,
        },
        {
          type: CHECK_TOKEN_ERROR,
          payload,
        },
      ];

      return store.dispatch(checkTokenAction()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    afterEach(() => {
      localStorage.removeItem("token");
    });
  });

  describe("editUserInfoAction", () => {
    beforeEach(() => {
      localStorage.setItem("token", "token");
    });

    test("editUserInfoAction - success", () => {
      const store = mockStore();

      const newUsername = "newUser";
      const newPassword = "newPass";
      const accountType = "bandleader";

      const payload = {
        isAuthenticated: true,
        token: "test token",
        username: "newUser",
        accountType: "bandleader",
      };

      jest
        .spyOn(axios, "patch")
        .mockResolvedValueOnce({ data: { ...payload } });

      const expectedActions = [
        {
          type: EDIT_USER_INFO_LOADING,
        },
        {
          type: EDIT_USER_INFO_SUCCESS,
          payload,
        },
      ];

      return store
        .dispatch(editUserInfoAction(newUsername, newPassword, accountType))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    test("editUserInfoAction - error", () => {
      const store = mockStore();

      const newUsername = "newUser";
      const newPassword = "newPass";
      const accountType = "bandleader";

      const payload = {
        errorMessage: "error",
      };

      jest
        .spyOn(axios, "patch")
        .mockRejectedValueOnce({ response: { data: { ...payload } } });

      const expectedActions = [
        {
          type: EDIT_USER_INFO_LOADING,
        },
        {
          type: EDIT_USER_INFO_ERROR,
          payload,
        },
      ];

      return store
        .dispatch(editUserInfoAction(newUsername, newPassword, accountType))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    afterEach(() => {
      localStorage.removeItem("token");
    });
  });

  describe("getUserInfoAction", () => {
    beforeEach(() => {
      localStorage.setItem("token", "token");
    });

    test("getUserInfoAction - success", () => {
      const store = mockStore();

      const payload = {
        isAuthenticated: true,
        token: "test token",
        username: "testuser@gmail.com",
        accountType: "client",
      };

      jest.spyOn(axios, "get").mockResolvedValueOnce({ data: { ...payload } });

      const expectedActions = [
        {
          type: GET_USER_INFO_LOADING,
        },
        {
          type: GET_USER_INFO_SUCCESS,
          payload,
        },
      ];

      return store.dispatch(getUserInfoAction()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    test("checkTokenAction - error", () => {
      const store = mockStore();

      const payload = {
        errorMessage: "error",
      };

      jest
        .spyOn(axios, "get")
        .mockRejectedValueOnce({ response: { data: { ...payload } } });

      const expectedActions = [
        {
          type: GET_USER_INFO_LOADING,
        },
        {
          type: GET_USER_INFO_ERROR,
          payload,
        },
      ];

      return store.dispatch(getUserInfoAction()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    afterEach(() => {
      localStorage.removeItem("token");
    });
  });
});
