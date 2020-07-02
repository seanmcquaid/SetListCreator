import React, {useState, useEffect, useCallback} from "react";
import Text from "components/Text/Text";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import styles from "./AddSongsPage.module.css";
import {addBandleaderSongAction, getBandleaderSongsAction, deleteBandleaderSongAction} from "actions/bandleaderActions/bandleaderActions";
import { useSelector, useDispatch } from "react-redux";
import Song from "components/Song/Song";
import { selectBandleaderState } from "selectors/bandleaderSelectors/bandleaderSelectors";

const AddSongsPage = () => {
    const {songList} = useSelector(selectBandleaderState);
    const dispatch = useDispatch();

    const [songName, setSongName] = useState("");
    const [artistName, setArtistName] = useState("");
    const [songKey, setSongKey] = useState("");

    useEffect(() => {
        dispatch(getBandleaderSongsAction());
    },[dispatch]);

    const songNameOnChangeHandler = useCallback(event => {
        setSongName(event.target.value);
    },[]);

    const artistNameOnChangeHandler = useCallback(event => {
        setArtistName(event.target.value);
    },[]);
    
    const songKeyOnChangeHandler = useCallback(event => {
        setSongKey(event.target.value);
    },[]);

    const addSongSubmitHandler = useCallback(event => {
        event.preventDefault();
        dispatch(addBandleaderSongAction(songName, artistName, songKey));
        setSongName("");
        setArtistName("");
        setSongKey("");
    },[dispatch, songName, artistName, songKey]);

    const deleteSongHandler = useCallback(songId => {
        dispatch(deleteBandleaderSongAction(songId));
    },[dispatch]);

    const songsList = songList.map((song, key) => {
        const {songname, artistname, songkey, id} = song;
        return (
            <Song
                key={key}
                songName={songname}
                artistName={artistname}
                songKey={songkey}
                songId={id}
                deleteSongHandler={() => deleteSongHandler(id)}
                isEditable
            />);
    });

    return(
        <div className={styles.addSongsPageContainer}>
            <div className={styles.addSongContainer}>
                <Text headerText={true}>Song List</Text>
                <form className={styles.addSongForm} onSubmit={addSongSubmitHandler}>
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
                    <Button title="Add Song" type="submit"/>
                </form>
            </div>
            <div className={styles.songsListContainer}>
                {songsList}
            </div>
        </div>
    )
};

export default AddSongsPage;