import React, {useState, useEffect} from "react";
import axios from "axios";
import {connect} from "react-redux";
import { tokenConfig } from "../../../actions/authActions/authActions";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Text from "../../UI/Text/Text";
import styles from "./BandLeaderEditSongPage.module.css";

const BandLeaderEditSongPage = props => {
    const [songName, setSongName] = useState("");
    const [artistName, setArtistName] = useState("");
    const [songKey, setSongKey] = useState("");
    const {songId} = props.match.params;

    useEffect(() => {
        const headers = tokenConfig();
        axios.get(`${window.apiHost}/bandLeader/getSong/${songId}`, headers)
            .then(async response => {
                const songInfo = response.data.songInfo[0];
                console.log(songInfo)
                const {songname, artistname, songkey} = songInfo;
                await setSongName(songname);
                await setArtistName(artistname);
                await setSongKey(songkey);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    const songNameOnChangeHandler = event => {
        setSongName(event.target.value);
    }

    const artistNameOnChangeHandler = event => {
        setArtistName(event.target.value);
    }

    const songKeyOnChangeHandler = event => {
        setSongKey(event.target.value);
    }

    const bandLeaderEditSongSubmitHandler = event => {

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

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(BandLeaderEditSongPage);