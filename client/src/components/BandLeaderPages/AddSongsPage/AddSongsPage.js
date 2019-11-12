import React, {useState, useEffect} from "react";
import Container from "../../UI/Container/Container";
import Text from "../../UI/Text/Text";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import styles from "./AddSongsPage.module.css";
import {addSongAction, getSongsAction, deleteSongAction} from "../../../actions/bandLeaderActions/bandLeaderActions";
import {useDispatch, useSelector} from "react-redux";
import Song from "../../UI/Song/Song";

const AddSongsPage = props => {
    const [songName, setSongName] = useState("");
    const [artistName, setArtistName] = useState("");
    const [songKey, setSongKey] = useState("");
    const [currentSongs, setCurrentSongs] = useState([]);
    const songsFromDatabase = useSelector(state => state.bandLeader.songList);
    // refactor this with mapstatetoprops and mapdispatch to props

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getSongsAction());
        setCurrentSongs(songsFromDatabase);
    },[])

    const songNameOnChangeHandler = event => {
        setSongName(event.target.value);
    };

    const artistNameOnChangeHandler = event => {
        setArtistName(event.target.value);
    };
    
    const songKeyOnChangeHandler = event => {
        setSongKey(event.target.value);
    };

    const addSongSubmitHandler = async event => {
        event.preventDefault();
        await dispatch(addSongAction(songName, artistName, songKey));
        setSongName("");
        setArtistName("");
        setSongKey("");
        await setCurrentSongs(songsFromDatabase);
    };

    const deleteSongHandler = async (songName, artistName, songKey) => {
        await dispatch(deleteSongAction(songName, artistName, songKey));
        console.log(songsFromDatabase);
        await setCurrentSongs(songsFromDatabase);
    };

    const songsList = currentSongs.map((song, key) => {
        const {songname, artistname, songkey} = song;
        return <Song
                    key={key}
                    songName={songname}
                    artistName={artistname}
                    songKey={songkey}
                    deleteSongHandler={() => deleteSongHandler(songname, artistname, songkey)}
                />
    });

    return(
        <Container centered={true}>
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
            <div className={styles.songsListContainer}>
                {songsList}
            </div>
        </Container>
    )
};

export default AddSongsPage;