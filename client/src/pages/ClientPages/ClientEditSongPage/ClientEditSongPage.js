import React, {useState, useEffect, useMemo, useCallback} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import { tokenConfig } from "actions/authActions/authActions";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import Text from "components/Text/Text";
import styles from "./ClientEditSongPage.module.css";
import {editClientSongAction} from "actions/clientActions/clientActions";
import Dropdown from "components/Dropdown/Dropdown";
import {apiHost} from "config";
import { useHistory } from "react-router-dom";

const ClientEditSongPage = props => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [songName, setSongName] = useState("");
    const [artistName, setArtistName] = useState("");
    const playListTypes = useMemo(() => ["requestedSong", "doNotPlaySong"], []);
    const [songPlayListType, setSongPlayListType] = useState("");
    const {songId} = props.match.params;

    useEffect(() => {
        const headers = tokenConfig();
        axios.get(`${apiHost}/client/getSong/${songId}`, headers)
            .then(response => {
                const songInfo = response.data.songInfo;
                const {songname, artistname, songtype} = songInfo;
                setSongName(songname);
                setArtistName(artistname);
                setSongPlayListType(songtype);
            })
            .catch(err => {
                console.log(err);
            });
    }, [songId])

    const songNameOnChangeHandler = useCallback(event => {
        setSongName(event.target.value);
    },[]);

    const artistNameOnChangeHandler = useCallback(event => {
        setArtistName(event.target.value);
    },[]);

    const songPlayListTypeOnChangeHandler = useCallback(event => {
        setSongPlayListType(event.target.value);
    },[]);

    const clientEditSongSubmitHandler = useCallback(event => {
        event.preventDefault();
        dispatch(editClientSongAction(songName, artistName, songPlayListType, songId));
        history.push("/clientHome");
    },[dispatch, songName, artistName, songPlayListType, songId, history]);

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

export default ClientEditSongPage;