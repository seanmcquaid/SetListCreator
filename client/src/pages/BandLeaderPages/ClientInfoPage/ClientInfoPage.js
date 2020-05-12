import React, { useEffect, useState } from "react";
import { tokenConfig } from "actions/authActions/authActions";
import {apiHost} from "config";
import axios from "axios";
import SongList from "components/SongList/SongList";
import LinkButton from "components/LinkButton/LinkButton";
import styles from "./ClientInfoPage.module.css";
import Text from "components/Text/Text";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";

const ClientInfoPage = props => {
    const {clientId} = props.match.params;
    const [isLoading, setIsLoading] = useState(true);
    const [requestedSongsList, setRequestedSongsList] = useState([]);
    const [doNotPlaySongsList, setDoNotPlaySongsList] = useState([]);
    const [clientInfo, setClientInfo] = useState({});
    const {username, setListAvailable, id} = clientInfo;

    useEffect(() => {
        if(isLoading){
            const headers = tokenConfig();
            axios.get(`${apiHost}/bandleader/getClientSongs/${clientId}`, headers)
                .then(response => {
                    setRequestedSongsList(response.data.requestedSongsList);
                    setDoNotPlaySongsList(response.data.doNotPlaySongsList);
                    setClientInfo(response.data.userInfo);
                })
                .catch(err => console.log(err));
            const timer = setTimeout(() => setIsLoading(false), 1500);
            return () => clearTimeout(timer);
        }
    },[clientId, isLoading]);

    if(isLoading){
        return <LoadingSpinner isLoading={isLoading}/>;
    }

    return(
        <div className={styles.clientInfoPageContainer}>
            <div className={styles.clientInfoContainer}>
                <Text headerText={true}>Client name : {username}</Text>
                {setListAvailable ? 
                    <LinkButton route={`/bandleader/createSetlist/${id}`}>Create Setlist</LinkButton> :
                    <Text>In Progress</Text>
                }
            </div>
            <div className={styles.songsContainer}>
                <div className={styles.requestedSongsListContainer}>
                    <Text headerText={true}>Requested Songs List</Text>
                    <SongList list={requestedSongsList}/>
                </div>
                <div className={styles.doNotPlaySongsListContainer}>
                    <Text headerText={true}>Do Not Play Songs List</Text>
                    <SongList list={doNotPlaySongsList}/>
                </div>
            </div>
        </div>
    )
};

export default ClientInfoPage;