import React from "react";
import Container from "../../UI/Container/Container";
import Text from "../../UI/Text/Text";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import {connect} from "react-redux";
import styles from "./ClientHomePage.module.css";
import Song from "../../UI/Song/Song";

const ClientHomePage = props => {
    return(
        <Container centered={true}>
            <Text headerText={true}>Musical Preferences Page</Text>
            <div className={styles.songsContainer}>
                <div className={styles.requestedSongsContainer}>
                    <Text>Requested Songs</Text>
                    <form>
                        <Input
                            name="requestedSongName"
                        />
                        <Input
                            name="requestedSongArtist"
                        />
                    </form>
                    <Button/>
                    <div></div>
                    Play List with form
                </div>
                <div className={styles.doNotPlaySongsContainer}>
                    <Text>DO NOT play list</Text>
                    <form>
                        <Input
                            name="doNotPlaylistSongName"
                        />
                        <Input
                            name="doNotPlaylistSongArtist"
                        />
                    </form>
                    <Button/>
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