import React, {useState} from "react";
import Container from "../../UI/Container/Container";
import Text from "../../UI/Text/Text";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import {connect} from "react-redux";
import styles from "./ClientHomePage.module.css";
import Song from "../../UI/Song/Song";

const ClientHomePage = props => {
    const [requestedSongName, setRequestedSongName] = useState("");
    const [requestedArtistName, setRequestedArtistName] = useState("");
    const [doNotPlaySongName, setDoNotPlaySongName] = useState("");
    const [doNotPlayArtistName, setDoNotPlayArtistName] = useState("");

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

    return(
        <Container centered={true}>
            <Text headerText={true}>Musical Preferences Page</Text>
            <div className={styles.songsContainer}>
                <div className={styles.requestedSongsContainer}>
                    <Text>Requested Songs</Text>
                    <form>
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
                    <div></div>
                    Play List with form
                </div>
                <div className={styles.doNotPlaySongsContainer}>
                    <Text>DO NOT Play List</Text>
                    <form>
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
                    <div></div>
                    Do Not List with form
                </div>
            </div>
        </Container>
    )
};

const mapStateToProps = state => ({
    client : state.client
});

const mapDispatchToProps = dispatch => {
    return {
        // insert actions here
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientHomePage);