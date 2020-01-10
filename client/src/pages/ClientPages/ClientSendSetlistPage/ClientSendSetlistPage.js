import React from "react";
import styles from "./ClientSendSetlistPage.module.css";
import Button from "components/Button/Button";
import {connect} from "react-redux";

const ClientSendSetlistPage = props => {
    return(
        <div className={styles.clientSendSetlistPageContainer}>
            <Text headerText={true}>Send Setlist</Text>
            <div className={styles.songContainer}>
                <div className={styles.requestedSongsContainer}></div>
                <div className={styles.doNotPlaySongsContainer}></div>
            </div>
            <Button
                title="Send Playlist"
                type="Button"
            />
        </div>
    )
};

const mapStateToProps = state => ({
    requestedSongsList : state.client.requestedSongsList,
    doNotPlaySongsList : state.client.doNotPlaySongsList,
});

const mapDispatchToProps = dispatch => ({
    getClientSongsAction : () => dispatch(getClientSongsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientSendSetlistPage);