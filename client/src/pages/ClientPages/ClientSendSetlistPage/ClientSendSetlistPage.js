import React, {useEffect} from "pages/ClientPages/ClientSendSetListPage/node_modules/react";
import styles from "./ClientSendSetListPage.module.css";
import Button from "pages/ClientPages/ClientSendSetListPage/node_modules/components/Button/Button";
import Text from "pages/ClientPages/ClientSendSetListPage/node_modules/components/Text/Text";
import {connect} from "pages/ClientPages/ClientSendSetListPage/node_modules/react-redux";
import {getClientSongsAction, deleteClientSongAction, sendClientSetListAction} from "pages/ClientPages/ClientSendSetListPage/node_modules/actions/clientActions/clientActions";
import Song from "pages/ClientPages/ClientSendSetListPage/node_modules/components/Song/Song";

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

    console.log(setListAvailabile);

    return(
        <div className={styles.clientSendSetListPageContainer}>
            <Text headerText={true}>Send Setlist</Text>
            <div className={styles.songContainer}>
                <div className={styles.requestedSongsContainer}>
                    <Text>Requested Songs</Text>
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
                    <Text>Do Not Play Songs</Text>
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
            {setListAvailabile ? <Text>Setlist Sent Already!</Text> : 
            <Button
                title="Send Playlist"
                type="Button"
                onClick={sendSetlistHandler}
            />}
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