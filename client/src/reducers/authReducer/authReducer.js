import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGOUT_LOADING,
  LOGOUT_SUCCESS,
  CHECK_TOKEN_LOADING,
  CHECK_TOKEN_SUCCESS,
  CHECK_TOKEN_ERROR,
  EDIT_USER_INFO_LOADING,
  EDIT_USER_INFO_SUCCESS,
  EDIT_USER_INFO_ERROR,
  GET_USER_INFO_LOADING,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_ERROR,
} from "actions/authActions/authActionTypes";

const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem("token"),
  username: "",
  accountType: "",
  isLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_LOADING:
    case LOGIN_LOADING:
    case LOGOUT_LOADING:
    case CHECK_TOKEN_LOADING:
    case EDIT_USER_INFO_LOADING:
    case GET_USER_INFO_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case CHECK_TOKEN_SUCCESS:
    case EDIT_USER_INFO_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        token: action.payload.token,
        username: action.payload.username,
        accountType: action.payload.accountType,
        isLoading: false,
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        username: action.payload.username,
        accountType: action.payload.accountType,
        isLoading: false,
      };
    case REGISTER_ERROR:
    case LOGIN_ERROR:
    case EDIT_USER_INFO_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        isLoading: false,
      };
    case GET_USER_INFO_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...initialState,
      };
    case CHECK_TOKEN_ERROR:
      localStorage.removeItem("token");
      return {
        ...initialState,
      };
    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
