import React, {useEffect} from "react";
import styles from "./ClientSendSetListPage.module.css";
import Button from "components/Button/Button";
import Text from "components/Text/Text";
import {connect} from "react-redux";
import {getClientSongsAction, deleteClientSongAction, sendClientSetListAction} from "actions/clientActions/clientActions";
import Song from "components/Song/Song";

const ClientSendSetListPage = props => {
    const {
        getClientSongsAction,
        requestedSongsList,
        doNotPlaySongsList,
        deleteClientSongAction,
        sendClientSetListAction,
        setListAvailabile,
    } = props;

    useEffect(() => {
        getClientSongsAction();
    }, [getClientSongsAction])

    const deleteSongHandler = async songId => {
        await deleteClientSongAction(songId);
    };

    const sendSetlistHandler = async () => {
        await sendClientSetListAction(true);
        await props.history.push("/clientHome");
    };

    return(
        <div className={styles.clientSendSetListPageContainer}>
            <Text headerText={true}>Send Setlist</Text>
            {setListAvailabile ? <Text>Setlist Sent Already!</Text> : 
            <Button
                title="Send Playlist"
                type="Button"
                onClick={sendSetlistHandler}
            />}
            <div className={styles.songContainer}>
                <div className={styles.requestedSongsContainer}>
                    <Text headerText={true}>Requested Songs</Text>
                    <div className={styles.songsContainer}>
                        {requestedSongsList.map((song, i) => 
                            <Song
                                songName={song.songname}
                                artistName={song.artistname}
                                deleteSongHandler={() => deleteSongHandler(song.id)}
                                key={i}
                                songId={song.id}
                            />
                        )}
                    </div>
                </div>
                <div className={styles.doNotPlaySongsContainer}>
                    <Text headerText={true}>Do Not Play Songs</Text>
                    <div className={styles.songsContainer}>
                        {doNotPlaySongsList.map((song, i) => 
                            <Song
                                songName={song.songname}
                                artistName={song.artistname}
                                deleteSongHandler={() => deleteSongHandler(song.id)}
                                key={i}
                                songId={song.id}
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
    setListAvailabile : state.client.setListAvailable,
});

const mapDispatchToProps = dispatch => ({
    getClientSongsAction : () => dispatch(getClientSongsAction()),
    deleteClientSongAction : songId => dispatch(deleteClientSongAction(songId)),
    sendClientSetListAction : (setListAvailability) => dispatch(sendClientSetListAction(setListAvailability)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientSendSetListPage);