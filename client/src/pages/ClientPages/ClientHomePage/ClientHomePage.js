import React, {useState, useEffect} from "react";
import Text from "components/Text/Text";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import {connect} from "react-redux";
import styles from "./ClientHomePage.module.css";
import Song from "components/Song/Song";
import {
    addClientRequestedSongAction, 
    addClientDoNotPlaySongAction, 
    getClientSongsAction,
    deleteClientSongAction
} from "actions/clientActions/clientActions";
import LinkButton from "components/LinkButton/LinkButton";

const ClientHomePage = props => {
    const [requestedSongName, setRequestedSongName] = useState("");
    const [requestedArtistName, setRequestedArtistName] = useState("");
    const [doNotPlaySongName, setDoNotPlaySongName] = useState("");
    const [doNotPlayArtistName, setDoNotPlayArtistName] = useState("");
    const {
        addClientRequestedSongAction, 
        addClientDoNotPlaySongAction, 
        getClientSongsAction,
        requestedSongsList,
        doNotPlaySongsList,
        deleteClientSongAction,
        setListAvailable,
        clientApproved
    } = props;

    useEffect(() => {
        getClientSongsAction();
    }, [getClientSongsAction])

    const requestedSongNameOnChangeHandler = event => {
        setRequestedSongName(event.target.value);
    };

    const requestedArtistNameOnChangeHandler = event => {
        setRequestedArtistName(event.target.value);
    };

    const doNotPlaySongNameOnChangeHandler = event => {
        setDoNotPlaySongName(event.target.value);
    };

    const doNotPlayArtistNameOnChangeHandler = event => {
        setDoNotPlayArtistName(event.target.value);
    };

    const requestedSongSubmitHandler = async event => {
        await event.preventDefault();
        await addClientRequestedSongAction(requestedSongName, requestedArtistName);
        await setRequestedSongName("");
        await setRequestedArtistName("");
    };

    const doNotPlaySongSubmitHandler = async event => {
        await event.preventDefault();
        await addClientDoNotPlaySongAction(doNotPlaySongName, doNotPlayArtistName);
        await setDoNotPlaySongName("");
        await setDoNotPlayArtistName("");
    };

    const deleteSongHandler = async (songId) => {
        await deleteClientSongAction(songId);
    };

    if(setListAvailable){
        return (
            <div className={styles.clientHomePageContainer}>
                <Text headerText={true}>Client Home Page</Text>
                <LinkButton route={clientApproved ? "/client/finalizedSetlist" : "/client/setListApproval"}>
                    {clientApproved ? "Get Finalized SetList" : "Look at Proposed SetList"}
                </LinkButton> 
            </div>
        )
    }

    return(
        <div className={styles.clientHomePageContainer}>
            <Text headerText={true}>Musical Preferences Page</Text>
            <LinkButton route="/client/sendSetList">Send Set List</LinkButton>
            <div className={styles.songsContainer}>
                <div className={styles.requestedSongsContainer}>
                    <Text>Requested Songs</Text>
                    <form className={styles.addSongFormContainer} onSubmit={requestedSongSubmitHandler}>
                        <Input
                            name="songName"
                            title="Song Name"
                            type="text"
                            placeholder="Enter song name here"
                            value={requestedSongName}
                            onChangeHandler={requestedSongNameOnChangeHandler}
                        />
                        <Input
                            name="artistName"
                            title="Artist Name"
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
                            name="songName"
                            title="Song Name"
                            type="text"
                            placeholder="Enter song name here"
                            value={doNotPlaySongName}
                            onChangeHandler={doNotPlaySongNameOnChangeHandler}
                        />
                        <Input
                            name="artistName"
                            title="Artist Name"
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

const mapStateToProps = state => ({
    requestedSongsList : state.client.requestedSongsList,
    doNotPlaySongsList : state.client.doNotPlaySongsList,
    setListAvailable : state.client.setListAvailable,
    clientApproved : state.client.clientApproved
});

const mapDispatchToProps = dispatch => ({
    addClientRequestedSongAction : (songName, artistName) => dispatch(addClientRequestedSongAction(songName, artistName)),
    addClientDoNotPlaySongAction : (songName, artistName) => dispatch(addClientDoNotPlaySongAction(songName, artistName)),
    deleteClientSongAction : songId => dispatch(deleteClientSongAction(songId)),
    getClientSongsAction : () => dispatch(getClientSongsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientHomePage);