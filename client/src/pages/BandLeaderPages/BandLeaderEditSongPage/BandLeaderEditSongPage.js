import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { tokenConfig } from "actions/authActions/authActions";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import Text from "components/Text/Text";
import styles from "./BandleaderEditSongPage.module.css";
import { editBandleaderSongAction } from "actions/bandleaderActions/bandleaderActions";
import { apiHost } from "config";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";

const BandleaderEditSongPage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isMounted = useRef(true);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [songKey, setSongKey] = useState("");
  const { songId } = props.match.params;

  useEffect(() => {
    if (isMounted.current) {
      const source = axios.CancelToken.source();

      const config = tokenConfig();
      config.cancelToken = source.token;

      axios
        .get(`${apiHost}/bandLeader/getSong/${songId}`, config)
        .then((response) => {
          const songInfo = response.data.songInfo;
          const { songname, artistname, songkey } = songInfo;
          const timer = setTimeout(() => {
            setSongName(songname);
            setArtistName(artistname);
            setSongKey(songkey);
            setIsLoading(false);
            source.cancel();
          }, 1500);
          return () => clearTimeout(timer);
        })
        .catch((err) => {
          const timer = setTimeout(() => {
            setErrorMessage(err.response.data.errorMessage);
            setIsLoading(false);
            source.cancel();
          }, 1500);
          return () => clearTimeout(timer);
        });
    }
    return () => {
      isMounted.current = false;
    };
  }, [songId]);

  const songNameOnChangeHandler = useCallback((event) => {
    setSongName(event.target.value);
  }, []);

  const artistNameOnChangeHandler = useCallback((event) => {
    setArtistName(event.target.value);
  }, []);

  const songKeyOnChangeHandler = useCallback((event) => {
    setSongKey(event.target.value);
  }, []);

  const bandLeaderEditSongSubmitHandler = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(editBandleaderSongAction(songName, artistName, songKey, songId));
      history.push("/bandleader/addSongs");
    },
    [dispatch, songName, artistName, songKey, songId, history]
  );

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  return (
    <div className={styles.editSongPageContainer}>
      <Text headerText={true}>Edit Song</Text>
      <Text>{errorMessage}</Text>
      <form
        onSubmit={bandLeaderEditSongSubmitHandler}
        className={styles.editSongForm}
      >
        <Input
          name="songName"
          title="Song Name"
          type="text"
          placeholder="Enter song name here"
          value={songName}
          onChangeHandler={songNameOnChangeHandler}
        />
        <Input
          name="artistName"
          title="Artist Name"
          type="text"
          placeholder="Enter artist name here"
          value={artistName}
          onChangeHandler={artistNameOnChangeHandler}
        />
        <Input
          name="keyName"
          title="Key"
          type="text"
          placeholder="Enter key here"
          value={songKey}
          onChangeHandler={songKeyOnChangeHandler}
        />
        <Button title="Edit Song" type="submit" />
      </form>
    </div>
  );
};

export default BandleaderEditSongPage;
