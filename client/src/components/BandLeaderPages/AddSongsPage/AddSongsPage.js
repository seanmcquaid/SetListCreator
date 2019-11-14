import React, {useState, useEffect} from "react";
import Container from "../../UI/Container/Container";
import Text from "../../UI/Text/Text";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import styles from "./AddSongsPage.module.css";
import {addSongAction, getSongsAction, deleteSongAction} from "../../../actions/bandLeaderActions/bandLeaderActions";
import {connect} from "react-redux";
import Song from "../../UI/Song/Song";

const AddSongsPage = props => {
    const [songName, setSongName] = useState("");
    const [artistName, setArtistName] = useState("");
    const [songKey, setSongKey] = useState("");
    const {getSongsAction} = props;

    useEffect(() => {
        getSongsAction();
    },[getSongsAction])

    const songNameOnChangeHandler = async event => {
        await setSongName(event.target.value);
    };

    const artistNameOnChangeHandler = async event => {
        await setArtistName(event.target.value);
    };
    
    const songKeyOnChangeHandler = async event => {
        await setSongKey(event.target.value);
    };

    const addSongSubmitHandler = async event => {
        event.preventDefault();
        await props.addSongAction(songName, artistName, songKey);
        await setSongName("");
        await setArtistName("");
        await setSongKey("");
    };

    const deleteSongHandler = async (songName, artistName, songKey) => {
        await props.deleteSongAction(songName, artistName, songKey);
    };

    const songsList = props.songList.map((song, key) => {
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

const mapStateToProps = state => ({
    songList : state.bandLeader.songList
});

const mapDispatchToProps = dispatch => {
    return {
        getSongsAction : () => dispatch(getSongsAction()),
        addSongAction : (songName, artistName, songKey) => dispatch(addSongAction(songName, artistName, songKey)),
        deleteSongAction : (songName, artistName, songKey) => dispatch(deleteSongAction(songName, artistName, songKey)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSongsPage);