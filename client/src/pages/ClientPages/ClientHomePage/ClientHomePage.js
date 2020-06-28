import React, {useState, useEffect, useCallback} from "react";
import Text from "components/Text/Text";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import {useSelector, useDispatch} from "react-redux";
import styles from "./ClientHomePage.module.css";
import Song from "components/Song/Song";
import {
    addClientRequestedSongAction, 
    addClientDoNotPlaySongAction, 
    getClientSongsAction,
    deleteClientSongAction
} from "actions/clientActions/clientActions";
import LinkButton from "components/LinkButton/LinkButton";
import { selectClientState } from "selectors/clientSelectors/clientSelectors";
import { selectErrorState } from "selectors/errorSelectors/errorSelectors";

const ClientHomePage = () => {
    const {requestedSongsList, doNotPlaySongsList, setListAvailable, clientApproved} = useSelector(selectClientState);
    const {errorMessage} = useSelector(selectErrorState);
    const dispatch = useDispatch();

    const [requestedSongName, setRequestedSongName] = useState("");
    const [requestedArtistName, setRequestedArtistName] = useState("");
    const [doNotPlaySongName, setDoNotPlaySongName] = useState("");
    const [doNotPlayArtistName, setDoNotPlayArtistName] = useState("");

    useEffect(() => {
        dispatch(getClientSongsAction());
    }, [dispatch]);

    const requestedSongNameOnChangeHandler = useCallback(event => {
        setRequestedSongName(event.target.value);
    },[]);

    const requestedArtistNameOnChangeHandler = useCallback(event => {
        setRequestedArtistName(event.target.value);
    },[]);

    const doNotPlaySongNameOnChangeHandler = useCallback(event => {
        setDoNotPlaySongName(event.target.value);
    },[]);

    const doNotPlayArtistNameOnChangeHandler = useCallback(event => {
        setDoNotPlayArtistName(event.target.value);
    },[]);

    const requestedSongSubmitHandler = useCallback(event => {
        event.preventDefault();
        dispatch(addClientRequestedSongAction(requestedSongName, requestedArtistName));
        setRequestedSongName("");
        setRequestedArtistName("");
    },[dispatch, requestedSongName, requestedArtistName]);

    const doNotPlaySongSubmitHandler = useCallback(event => {
        event.preventDefault();
        dispatch(addClientDoNotPlaySongAction(doNotPlaySongName, doNotPlayArtistName));
        setDoNotPlaySongName("");
        setDoNotPlayArtistName("");
    },[dispatch, doNotPlaySongName, doNotPlayArtistName]);

    const deleteSongHandler = useCallback(songId => {
        dispatch(deleteClientSongAction(songId));
    },[dispatch]);

    if(setListAvailable){
        return (
            <div className={styles.clientHomePageContainer}>
                <Text headerText={true}>Client Home Page</Text>
                <LinkButton route={clientApproved ? "/client/finalizedSetList" : "/client/setListApproval"}>
                    {clientApproved ? "Get Finalized SetList" : "Look at Proposed SetList"}
                </LinkButton> 
            </div>
        )
    }

    return(
        <div className={styles.clientHomePageContainer}>
            <Text headerText={true}>Musical Preferences Page</Text>
            <Text>{errorMessage}</Text>
            <LinkButton route="/client/sendSetList">Send Set List</LinkButton>
            <div className={styles.songsContainer}>
                <div className={styles.requestedSongsContainer}>
                    <Text>Requested Songs</Text>
                    <form className={styles.addSongFormContainer} onSubmit={requestedSongSubmitHandler}>
                        <Input
                            name="requestedSongName"
                            title="Requested Song Name"
                            type="text"
                            placeholder="Enter song name here"
                            value={requestedSongName}
                            onChangeHandler={requestedSongNameOnChangeHandler}
                        />
                        <Input
                            name="requestedArtistName"
                            title="Requested Artist Name"
                            type="text"
                            placeholder="Enter artist name here"
                            value={requestedArtistName}
                            onChangeHandler={requestedArtistNameOnChangeHandler}
                        />
                        <Button
                            title="Add Requested Song"
                            type="Submit"
                        />
                    </form>
                    <div className={styles.songsContainer}>
                        {requestedSongsList.map((song, i) =>
                            <Song
                                songName={song.songname}
                                artistName={song.artistname}
                                deleteSongHandler={() => deleteSongHandler(song.id)}
                                key={i}
                                songId={song.id}
                                isEditable
                            />    
                        )}
                    </div>
                </div>
                <div className={styles.doNotPlaySongsContainer}>
                    <Text>DO NOT Play List</Text>
                    <form className={styles.addSongFormContainer} onSubmit={doNotPlaySongSubmitHandler}>
                        <Input
                            name="doNotPlaySongName"
                            title="Do Not Play Song Name"
                            type="text"
                            placeholder="Enter song name here"
                            value={doNotPlaySongName}
                            onChangeHandler={doNotPlaySongNameOnChangeHandler}
                        />
                        <Input
                            name="doNotPlayArtistName"
                            title="Do Not Play Artist Name"
                            type="text"
                            placeholder="Enter artist name here"
                            value={doNotPlayArtistName}
                            onChangeHandler={doNotPlayArtistNameOnChangeHandler}
                        />
                        <Button
                            title="Add Do Not Playlist Song"
                            type="Submit"
                        />
                    </form>
                    <div className={styles.songsContainer}>
                    {doNotPlaySongsList.map((song, i) => 
                            <Song
                                songName={song.songname}
                                artistName={song.artistname}
                                deleteSongHandler={() => deleteSongHandler(song.id)}
                                key={i}
                                songId={song.id}
                                isEditable
                            />    
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ClientHomePage;