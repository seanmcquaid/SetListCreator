import React, {useState, useEffect} from "pages/BandleaderPages/AddSongsPage/node_modules/react";
import Text from "pages/BandleaderPages/AddSongsPage/node_modules/components/Text/Text";
import Input from "pages/BandleaderPages/AddSongsPage/node_modules/components/Input/Input";
import Button from "pages/BandleaderPages/AddSongsPage/node_modules/components/Button/Button";
import styles from "./AddSongsPage.module.css";
import {addBandleaderSongAction, getBandleaderSongsAction, deleteBandleaderSongAction} from "pages/BandleaderPages/AddSongsPage/node_modules/actions/bandleaderActions/bandleaderActions";
import {connect} from "pages/BandleaderPages/AddSongsPage/node_modules/react-redux";
import Song from "pages/BandleaderPages/AddSongsPage/node_modules/components/Song/Song";

const AddSongsPage = ({getBandleaderSongsAction, deleteBandleaderSongAction, addBandleaderSongAction, songList}) => {
    const [songName, setSongName] = useState("");
    const [artistName, setArtistName] = useState("");
    const [songKey, setSongKey] = useState("");

    useEffect(() => {
        getBandleaderSongsAction();
    },[getBandleaderSongsAction])

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
        await addBandleaderSongAction(songName, artistName, songKey);
        await setSongName("");
        await setArtistName("");
        await setSongKey("");
    };

    const deleteSongHandler = async songId => {
        await deleteBandleaderSongAction(songId);
    };

    const songsList = songList.map((song, key) => {
        const {songname, artistname, songkey, id} = song;
        return <Song
                    key={key}
                    songName={songname}
                    artistName={artistname}
                    songKey={songkey}
                    songId={id}
                    deleteSongHandler={() => deleteSongHandler(id)}
                    isEditable
                />
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

const mapStateToProps = state => ({
    songList : state.bandleader.songList
});

const mapDispatchToProps = dispatch => {
    return {
        getBandleaderSongsAction : () => dispatch(getBandleaderSongsAction()),
        addBandleaderSongAction : (songName, artistName, songKey) => dispatch(addBandleaderSongAction(songName, artistName, songKey)),
        deleteBandleaderSongAction : songId => dispatch(deleteBandleaderSongAction(songId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSongsPage);