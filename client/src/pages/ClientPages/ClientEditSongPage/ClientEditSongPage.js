import React, {useState, useEffect} from "react";
import axios from "axios";
import {connect} from "react-redux";
import { tokenConfig } from "actions/authActions/authActions";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import Text from "components/Text/Text";
import styles from "./ClientEditSongPage.module.css";
import {editClientSongAction} from "actions/clientActions/clientActions";
import Dropdown from "components/Dropdown/Dropdown";
import {apiHost} from "config";

const ClientEditSongPage = props => {
    const [songName, setSongName] = useState("");
    const [artistName, setArtistName] = useState("");
    const playListTypes = ["requestedSong", "doNotPlaySong"]
    const [songPlayListType, setSongPlayListType] = useState("");
    const {songId} = props.match.params;
    const {editClientSongAction} = props;

    useEffect(() => {
        const headers = tokenConfig();
        axios.get(`${apiHost}/client/getSong/${songId}`, headers)
            .then(async response => {
                const songInfo = response.data.songInfo;
                const {songname, artistname, songtype} = songInfo;
                await setSongName(songname);
                await setArtistName(artistname);
                await setSongPlayListType(songtype);
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

    const songPlayListTypeOnChangeHandler = event => {
        setSongPlayListType(event.target.value);
    }

    const clientEditSongSubmitHandler = async event => {
        event.preventDefault();
        await editClientSongAction(songName, artistName, songPlayListType, songId);
        await props.history.push("/clientHome");
    };

    return(
        <div className={styles.editSongPageContainer}>
            <Text headerText={true}>Edit Song</Text>
            <form onSubmit={clientEditSongSubmitHandler} className={styles.editSongForm}>
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
                <Dropdown
                    items={playListTypes}
                    selectedItem={songPlayListType}
                    selectedItemOnChangeHandler={songPlayListTypeOnChangeHandler}
                />
                <Button title="Edit Song" type="submit"/>
            </form>
            
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    editClientSongAction : (songName, artistName, songPlayListType, songId) => dispatch(editClientSongAction(songName, artistName, songPlayListType, songId))
});

export default connect(null, mapDispatchToProps)(ClientEditSongPage);