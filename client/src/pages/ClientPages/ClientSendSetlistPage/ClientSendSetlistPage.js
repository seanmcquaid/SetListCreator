import React, {useEffect, useCallback} from "react";
import styles from "./ClientSendSetListPage.module.css";
import Button from "components/Button/Button";
import Text from "components/Text/Text";
import {useSelector, useDispatch} from "react-redux";
import {getClientSongsAction, deleteClientSongAction, sendClientSetListAction} from "actions/clientActions/clientActions";
import Song from "components/Song/Song";
import { useHistory } from "react-router-dom";
import { selectClientState } from "selectors/clientSelectors/clientSelectors";
import { selectErrorState } from "selectors/errorSelectors/errorSelectors";

const ClientSendSetListPage = () => {
    const {setListAvailabile, requestedSongsList, doNotPlaySongsList} = useSelector(selectClientState);
    const {errorMessage} = useSelector(selectErrorState);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getClientSongsAction());
    }, [dispatch])

    const deleteSongHandler = useCallback(songId => {
        dispatch(deleteClientSongAction(songId));
    },[dispatch]);

    const sendSetlistHandler = useCallback(() => {
        dispatch(sendClientSetListAction(true));
        history.push("/clientHome");
    },[dispatch, history]);

    return(
        <div className={styles.clientSendSetListPageContainer}>
            <Text headerText={true}>Send Setlist</Text>
            <Text>{errorMessage}</Text>
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

export default ClientSendSetListPage;