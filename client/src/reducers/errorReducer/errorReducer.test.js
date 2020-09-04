import {
  REGISTER_ERROR,
  LOGIN_ERROR,
  CHECK_TOKEN_ERROR,
  EDIT_USER_INFO_ERROR,
  GET_USER_INFO_ERROR,
} from "actions/authActions/authActionTypes";
import {
  ADD_BANDLEADER_SONG_ERROR,
  EDIT_BANDLEADER_SONG_ERROR,
  GET_BANDLEADER_SONGS_ERROR,
  DELETE_BANDLEADER_SONG_ERROR,
} from "actions/bandleaderActions/bandleaderActionTypes";
import {
  GET_CLIENT_SONGS_ERROR,
  ADD_CLIENT_REQUESTED_SONG_ERROR,
  ADD_CLIENT_DO_NOT_PLAY_SONG_ERROR,
  DELETE_CLIENT_SONG_ERROR,
  EDIT_CLIENT_SONG_ERROR,
} from "../../actions/clientActions/clientActionTypes";
import { CLEAR_ERROR_MESSAGE } from "actions/errorActions/errorActionTypes";
import errorReducer from "./errorReducer";

describe("errorReducer", () => {
  const initialState = {
    errorMessage: "",
  };

  describe("REGISTER_ERROR", () => {
    test("REGISTER_ERROR - Has error message", () => {
      const action = {
        type: REGISTER_ERROR,
        payload: {
          errorMessage: "ERROR MESSAGE HERE",
        },
      };

      const expectedResult = {
        errorMessage: "ERROR MESSAGE HERE",
      };

      expect(errorReducer(initialState, action)).toEqual(expectedResult);
    });

    test("REGISTER_ERROR - Has no error message", () => {
      const action = {
        type: REGISTER_ERROR,
      };

      expect(errorReducer(initialState, action)).toEqual(initialState);
    });
  });

  describe("LOGIN_ERROR", () => {
    test("LOGIN_ERROR - Has error message", () => {
      const action = {
        type: LOGIN_ERROR,
        payload: {
          errorMessage: "ERROR MESSAGE HERE",
        },
      };

      const expectedResult = {
        errorMessage: "ERROR MESSAGE HERE",
      };

      expect(errorReducer(initialState, action)).toEqual(expectedResult);
    });

    test("LOGIN_ERROR - Has no error message", () => {
      const action = {
        type: LOGIN_ERROR,
      };

      expect(errorReducer(initialState, action)).toEqual(initialState);
    });
  });

  describe("CHECK_TOKEN_ERROR", () => {
    test("CHECK_TOKEN_ERROR - Has error message", () => {
      const action = {
        type: CHECK_TOKEN_ERROR,
        payload: {
          errorMessage: "ERROR MESSAGE HERE",
        },
      };

      const expectedResult = {
        errorMessage: "ERROR MESSAGE HERE",
      };

      expect(errorReducer(initialState, action)).toEqual(expectedResult);
    });

    test("CHECK_TOKEN_ERROR - Has no error message", () => {
      const action = {
        type: CHECK_TOKEN_ERROR,
      };

      expect(errorReducer(initialState, action)).toEqual(initialState);
    });
  });

  describe("EDIT_USER_INFO_ERROR", () => {
    test("EDIT_USER_INFO_ERROR - Has error message", () => {
      const action = {
        type: EDIT_USER_INFO_ERROR,
        payload: {
          errorMessage: "ERROR MESSAGE HERE",
        },
      };

      const expectedResult = {
        errorMessage: "ERROR MESSAGE HERE",
      };

      expect(errorReducer(initialState, action)).toEqual(expectedResult);
    });

    test("EDIT_USER_INFO_ERROR - Has no error message", () => {
      const action = {
        type: EDIT_USER_INFO_ERROR,
      };

      expect(errorReducer(initialState, action)).toEqual(initialState);
    });
  });

  describe("GET_USER_INFO_ERROR", () => {
    test("GET_USER_INFO_ERROR - Has error message", () => {
      const action = {
        type: GET_USER_INFO_ERROR,
        payload: {
          errorMessage: "ERROR MESSAGE HERE",
        },
      };

      const expectedResult = {
        errorMessage: "ERROR MESSAGE HERE",
      };

      expect(errorReducer(initialState, action)).toEqual(expectedResult);
    });

    test("GET_USER_INFO_ERROR - Has no error message", () => {
      const action = {
        type: GET_USER_INFO_ERROR,
      };

      expect(errorReducer(initialState, action)).toEqual(initialState);
    });
  });

  describe("ADD_BANDLEADER_SONG_ERROR", () => {
    test("ADD_BANDLEADER_SONG_ERROR - Has error message", () => {
      const action = {
        type: ADD_BANDLEADER_SONG_ERROR,
        payload: {
          errorMessage: "ERROR MESSAGE HERE",
        },
      };

      const expectedResult = {
        errorMessage: "ERROR MESSAGE HERE",
      };

      expect(errorReducer(initialState, action)).toEqual(expectedResult);
    });

    test("ADD_BANDLEADER_SONG_ERROR - Has no error message", () => {
      const action = {
        type: ADD_BANDLEADER_SONG_ERROR,
      };

      expect(errorReducer(initialState, action)).toEqual(initialState);
    });
  });

  describe("EDIT_BANDLEADER_SONG_ERROR", () => {
    test("EDIT_BANDLEADER_SONG_ERROR - Has error message", () => {
      const action = {
        type: EDIT_BANDLEADER_SONG_ERROR,
        payload: {
          errorMessage: "ERROR MESSAGE HERE",
        },
      };

      const expectedResult = {
        errorMessage: "ERROR MESSAGE HERE",
      };

      expect(errorReducer(initialState, action)).toEqual(expectedResult);
    });

    test("EDIT_BANDLEADER_SONG_ERROR - Has no error message", () => {
      const action = {
        type: EDIT_BANDLEADER_SONG_ERROR,
      };

      expect(errorReducer(initialState, action)).toEqual(initialState);
    });
  });

  describe("GET_BANDLEADER_SONGS_ERROR", () => {
    test("GET_BANDLEADER_SONGS_ERROR - Has error message", () => {
      const action = {
        type: GET_BANDLEADER_SONGS_ERROR,
        payload: {
          errorMessage: "ERROR MESSAGE HERE",
        },
      };

      const expectedResult = {
        errorMessage: "ERROR MESSAGE HERE",
      };

      expect(errorReducer(initialState, action)).toEqual(expectedResult);
    });

    test("GET_BANDLEADER_SONGS_ERROR - Has no error message", () => {
      const action = {
        type: GET_BANDLEADER_SONGS_ERROR,
      };

      expect(errorReducer(initialState, action)).toEqual(initialState);
    });
  });

  describe("DELETE_BANDLEADER_SONG_ERROR", () => {
    test("DELETE_BANDLEADER_SONG_ERROR - Has error message", () => {
      const action = {
        type: DELETE_BANDLEADER_SONG_ERROR,
        payload: {
          errorMessage: "ERROR MESSAGE HERE",
        },
      };

      const expectedResult = {
        errorMessage: "ERROR MESSAGE HERE",
      };

      expect(errorReducer(initialState, action)).toEqual(expectedResult);
    });

    test("DELETE_BANDLEADER_SONG_ERROR - Has no error message", () => {
      const action = {
        type: DELETE_BANDLEADER_SONG_ERROR,
      };

      expect(errorReducer(initialState, action)).toEqual(initialState);
    });
  });

  describe("GET_CLIENT_SONGS_ERROR", () => {
    test("GET_CLIENT_SONGS_ERROR - Has error message", () => {
      const action = {
        type: GET_CLIENT_SONGS_ERROR,
        payload: {
          errorMessage: "ERROR MESSAGE HERE",
        },
      };

      const expectedResult = {
        errorMessage: "ERROR MESSAGE HERE",
      };

      expect(errorReducer(initialState, action)).toEqual(expectedResult);
    });

    test("GET_CLIENT_SONGS_ERROR - Has no error message", () => {
      const action = {
        type: GET_CLIENT_SONGS_ERROR,
      };

      expect(errorReducer(initialState, action)).toEqual(initialState);
    });
  });

  describe("ADD_CLIENT_REQUESTED_SONG_ERROR", () => {
    test("ADD_CLIENT_REQUESTED_SONG_ERROR - Has error message", () => {
      const action = {
        type: ADD_CLIENT_REQUESTED_SONG_ERROR,
        payload: {
          errorMessage: "ERROR MESSAGE HERE",
        },
      };

      const expectedResult = {
        errorMessage: "ERROR MESSAGE HERE",
      };

      expect(errorReducer(initialState, action)).toEqual(expectedResult);
    });

    test("ADD_CLIENT_REQUESTED_SONG_ERROR - Has no error message", () => {
      const action = {
        type: ADD_CLIENT_REQUESTED_SONG_ERROR,
      };

      expect(errorReducer(initialState, action)).toEqual(initialState);
    });
  });

  describe("ADD_CLIENT_DO_NOT_PLAY_SONG_ERROR", () => {
    test("ADD_CLIENT_DO_NOT_PLAY_SONG_ERROR - Has error message", () => {
      const action = {
        type: ADD_CLIENT_DO_NOT_PLAY_SONG_ERROR,
        payload: {
          errorMessage: "ERROR MESSAGE HERE",
        },
      };

      const expectedResult = {
        errorMessage: "ERROR MESSAGE HERE",
      };

      expect(errorReducer(initialState, action)).toEqual(expectedResult);
    });

    test("ADD_CLIENT_DO_NOT_PLAY_SONG_ERROR - Has no error message", () => {
      const action = {
        type: ADD_CLIENT_DO_NOT_PLAY_SONG_ERROR,
      };

      expect(errorReducer(initialState, action)).toEqual(initialState);
    });
  });

  describe("DELETE_CLIENT_SONG_ERROR", () => {
    test("DELETE_CLIENT_SONG_ERROR - Has error message", () => {
      const action = {
        type: DELETE_CLIENT_SONG_ERROR,
        payload: {
          errorMessage: "ERROR MESSAGE HERE",
        },
      };

      const expectedResult = {
        errorMessage: "ERROR MESSAGE HERE",
      };

      expect(errorReducer(initialState, action)).toEqual(expectedResult);
    });

    test("DELETE_CLIENT_SONG_ERROR - Has no error message", () => {
      const action = {
        type: DELETE_CLIENT_SONG_ERROR,
      };

      expect(errorReducer(initialState, action)).toEqual(initialState);
    });
  });

  describe("EDIT_CLIENT_SONG_ERROR", () => {
    test("EDIT_CLIENT_SONG_ERROR - Has error message", () => {
      const action = {
        type: EDIT_CLIENT_SONG_ERROR,
        payload: {
          errorMessage: "ERROR MESSAGE HERE",
        },
      };

      const expectedResult = {
        errorMessage: "ERROR MESSAGE HERE",
      };

      expect(errorReducer(initialState, action)).toEqual(expectedResult);
    });

    test("EDIT_CLIENT_SONG_ERROR - Has no error message", () => {
      const action = {
        type: EDIT_CLIENT_SONG_ERROR,
      };

      expect(errorReducer(initialState, action)).toEqual(initialState);
    });
  });
  test("CLEAR_ERROR_MESSAGE", () => {
    const action = {
      type: CLEAR_ERROR_MESSAGE,
    };

    expect(errorReducer(initialState, action)).toEqual(initialState);
  });

  test("DEFAULT", () => {
    const action = {
      type: "DEFAULT",
    };

    const expectedResult = {
      errorMessage: "",
    };

    expect(errorReducer(initialState, action)).toEqual(expectedResult);
  });
});
