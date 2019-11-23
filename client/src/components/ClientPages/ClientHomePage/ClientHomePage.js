import React, {useState, useEffect} from "react";
import Container from "../../UI/Container/Container";
import Text from "../../UI/Text/Text";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import {connect} from "react-redux";
import styles from "./ClientHomePage.module.css";
import Song from "../../UI/Song/Song";
import {addClientRequestedSongAction, addClientDoNotPlaySongAction, getClientSongsAction} from "../../../actions/clientActions/clientActions";

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
        doNotPlaySongsList
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

    const deleteSongHandler = (songName, artistName, songType) => {
        
    };

    console.log(props)

    return(
        <Container centered={true}>
            <Text headerText={true}>Musical Preferences Page</Text>
            <div className={styles.songsContainer}>
                <div className={styles.requestedSongsContainer}>
                    <Text>Requested Songs</Text>
                    <form onSubmit={requestedSongSubmitHandler}>
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
                    <div>
                        {requestedSongsList.map((song, i) => 
                            <Song
                                songName={song.songname}
                                artistName={song.artistname}
                                deleteSongHandler={deleteSongHandler}
                                key={i}
                            />    
                        )}
                    </div>
                </div>
                <div className={styles.doNotPlaySongsContainer}>
                    <Text>DO NOT Play List</Text>
                    <form onSubmit={doNotPlaySongSubmitHandler}>
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
                    <div>
                    {doNotPlaySongsList.map((song, i) => 
                            <Song
                                songName={song.songname}
                                artistName={song.artistname}
                                deleteSongHandler={deleteSongHandler}
                                key={i}
                            />    
                        )}
                    </div>
                    Do Not List with form
                </div>
            </div>
        </Container>
    )
};

const mapStateToProps = state => ({
    requestedSongsList : state.client.requestedSongsList,
    doNotPlaySongsList : state.client.doNotPlaySongsList,
});

const mapDispatchToProps = dispatch => {
    return {
        addClientRequestedSongAction : (songName, artistName) => dispatch(addClientRequestedSongAction(songName, artistName)),
        addClientDoNotPlaySongAction : (songName, artistName) => dispatch(addClientDoNotPlaySongAction(songName, artistName)),
        getClientSongsAction : () => dispatch(getClientSongsAction()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientHomePage);