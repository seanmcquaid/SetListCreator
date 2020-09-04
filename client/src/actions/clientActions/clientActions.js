import axios from "axios";
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
  SEND_CLIENT_SETLIST_ERROR,
  SEND_CLIENT_SETLIST_SUCCESS,
  SEND_CLIENT_SETLIST_LOADING,
} from "./clientActionTypes";
import { tokenConfig } from "../authActions/authActions";
import { apiHost } from "config";

export const getClientSongsAction = () => (dispatch) => {
  const source = axios.CancelToken.source();

  dispatch({
    type: GET_CLIENT_SONGS_LOADING,
  });

  const config = tokenConfig();
  config.cancelToken = source.token;

  return axios
    .get(`${apiHost}/client/getSongs`, config)
    .then((response) => {
      dispatch({
        type: GET_CLIENT_SONGS_SUCCESS,
        payload: response.data,
      });
      source.cancel();
    })
    .catch((err) => {
      dispatch({
        type: GET_CLIENT_SONGS_ERROR,
        payload: err.response.data,
      });
      source.cancel();
    });
};

export const addClientRequestedSongAction = (songName, artistName) => (
  dispatch
) => {
  const source = axios.CancelToken.source();

  dispatch({
    type: ADD_CLIENT_REQUESTED_SONG_LOADING,
  });

  const requestBody = {
    songName,
    artistName,
  };

  const config = tokenConfig();
  config.cancelToken = source.token;

  return axios
    .post(`${apiHost}/client/addSong/requestedSong`, requestBody, config)
    .then((response) => {
      dispatch({
        type: ADD_CLIENT_REQUESTED_SONG_SUCCESS,
        payload: response.data,
      });
      source.cancel();
    })
    .catch((err) => {
      dispatch({
        type: ADD_CLIENT_REQUESTED_SONG_ERROR,
        payload: err.response.data,
      });
      source.cancel();
    });
};

export const addClientDoNotPlaySongAction = (songName, artistName) => (
  dispatch
) => {
  const source = axios.CancelToken.source();

  dispatch({
    type: ADD_CLIENT_DO_NOT_PLAY_SONG_LOADING,
  });

  const requestBody = {
    songName,
    artistName,
  };

  const config = tokenConfig();
  config.cancelToken = source.token;

  return axios
    .post(`${apiHost}/client/addSong/doNotPlaySong`, requestBody, config)
    .then((response) => {
      dispatch({
        type: ADD_CLIENT_DO_NOT_PLAY_SONG_SUCCESS,
        payload: response.data,
      });
      source.cancel();
    })
    .catch((err) => {
      dispatch({
        type: ADD_CLIENT_DO_NOT_PLAY_SONG_ERROR,
        payload: err.response.data,
      });
      source.cancel();
    });
};

export const deleteClientSongAction = (songId) => (dispatch) => {
  const source = axios.CancelToken.source();

  dispatch({
    type: DELETE_CLIENT_SONG_LOADING,
  });

  const config = tokenConfig();
  config.cancelToken = source.token;

  return axios
    .delete(`${apiHost}/client/deleteSong/${songId}`, config)
    .then((response) => {
      dispatch({
        type: DELETE_CLIENT_SONG_SUCCESS,
        payload: response.data,
      });
      source.cancel();
    })
    .catch((err) => {
      dispatch({
        type: DELETE_CLIENT_SONG_ERROR,
        payload: err.response.data,
      });
      source.cancel();
    });
};

export const editClientSongAction = (
  songName,
  artistName,
  playListType,
  songId
) => (dispatch) => {
  const source = axios.CancelToken.source();

  dispatch({
    type: EDIT_CLIENT_SONG_LOADING,
  });

  const requestBody = {
    songName,
    artistName,
    playListType,
  };

  const config = tokenConfig();
  config.cancelToken = source.token;

  return axios
    .patch(`${apiHost}/client/editSong/${songId}`, requestBody, config)
    .then((response) => {
      dispatch({
        type: EDIT_CLIENT_SONG_SUCCESS,
        payload: response.data,
      });
      source.cancel();
    })
    .catch((err) => {
      dispatch({
        type: EDIT_CLIENT_SONG_ERROR,
        payload: err.response.data,
      });
      source.cancel();
    });
};

export const sendClientSetListAction = (setListAvailability) => (dispatch) => {
  const source = axios.CancelToken.source();

  dispatch({
    type: SEND_CLIENT_SETLIST_LOADING,
  });

  const requestBody = {
    setListAvailability,
  };

  const config = tokenConfig();
  config.cancelToken = source.token;

  return axios
    .patch(`${apiHost}/users/sendClientSetList`, requestBody, config)
    .then((response) => {
      dispatch({
        type: SEND_CLIENT_SETLIST_SUCCESS,
        payload: response.data,
      });
      source.cancel();
    })
    .catch((err) => {
      dispatch({
        type: SEND_CLIENT_SETLIST_ERROR,
        payload: err.response.data,
      });
      source.cancel();
    });
};
