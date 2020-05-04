import React, {useState, useEffect} from "pages/BandleaderPages/BandleaderEditSongPage/node_modules/react";
import axios from "pages/BandleaderPages/BandleaderEditSongPage/node_modules/axios";
import {connect} from "pages/BandleaderPages/BandleaderEditSongPage/node_modules/react-redux";
import { tokenConfig } from "pages/BandleaderPages/BandleaderEditSongPage/node_modules/actions/authActions/authActions";
import Input from "pages/BandleaderPages/BandleaderEditSongPage/node_modules/components/Input/Input";
import Button from "pages/BandleaderPages/BandleaderEditSongPage/node_modules/components/Button/Button";
import Text from "pages/BandleaderPages/BandleaderEditSongPage/node_modules/components/Text/Text";
import styles from "./BandLeaderEditSongPage.module.css";
import {editBandleaderSongAction} from "pages/BandleaderPages/BandleaderEditSongPage/node_modules/actions/bandleaderActions/bandleaderActions";
import {apiHost} from "pages/BandleaderPages/BandleaderEditSongPage/node_modules/config";

const BandleaderEditSongPage = props => {
    const [songName, setSongName] = useState("");
    const [artistName, setArtistName] = useState("");
    const [songKey, setSongKey] = useState("");
    const {songId} = props.match.params;
    const {editBandleaderSongAction} = props;

    useEffect(() => {
        const headers = tokenConfig();
        axios.get(`${apiHost}/bandLeader/getSong/${songId}`, headers)
            .then(async response => {
                const songInfo = response.data.songInfo[0];
                const {songname, artistname, songkey} = songInfo;
                await setSongName(songname);
                await setArtistName(artistname);
                await setSongKey(songkey);
            })
            .catch(err => {
                console.log(err);
            });
    }, [songId])

    const songNameOnChangeHandler = event => {
        setSongName(event.target.value);
    }

    const artistNameOnChangeHandler = event => {
        setArtistName(event.target.value);
    }

    const songKeyOnChangeHandler = event => {
        setSongKey(event.target.value);
    }

    const bandLeaderEditSongSubmitHandler = async event => {
        event.preventDefault();
        await editBandleaderSongAction(songName, artistName, songKey, songId);
        await props.history.push("/bandLeader/addSongs")
    };
    

    return(
        <div className={styles.editSongPageContainer}>
            <Text headerText={true}>Edit Song</Text>
            <form onSubmit={bandLeaderEditSongSubmitHandler} className={styles.editSongForm}>
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
                <Button title="Edit Song" type="submit"/>
            </form>
            
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    editBandleaderSongAction : (songName, artistName, songKey, songId) => dispatch(editBandleaderSongAction(songName, artistName, songKey, songId))
});

export default connect(null, mapDispatchToProps)(BandleaderEditSongPage);