import React, { useEffect, useState } from "pages/BandleaderPages/ClientInfoPage/node_modules/react";
import { tokenConfig } from "pages/BandleaderPages/ClientInfoPage/node_modules/actions/authActions/authActions";
import {apiHost} from "pages/BandleaderPages/ClientInfoPage/node_modules/config";
import axios from "pages/BandleaderPages/ClientInfoPage/node_modules/axios";
import SongList from "pages/BandleaderPages/ClientInfoPage/node_modules/components/SongList/SongList";
import LinkButton from "pages/BandleaderPages/ClientInfoPage/node_modules/components/LinkButton/LinkButton";
import styles from "./ClientInfoPage.module.css";
import Text from "pages/BandleaderPages/ClientInfoPage/node_modules/components/Text/Text";

const ClientInfoPage = props => {
    const {clientId} = props.match.params;
    const [isLoading, setIsLoading] = useState(true);
    const [requestedSongsList, setRequestedSongsList] = useState([]);
    const [doNotPlaySongsList, setDoNotPlaySongsList] = useState([]);
    const [clientInfo, setClientInfo] = useState({});
    const {username, setlistavailable, id} = clientInfo;

    useEffect(() => {
        if(isLoading){
            const headers = tokenConfig();
            axios.get(`${apiHost}/bandleader/getClientSongs/${clientId}`, headers)
                .then(response => {
                    setIsLoading(false);
                    setRequestedSongsList(response.data.requestedSongsList);
                    setDoNotPlaySongsList(response.data.doNotPlaySongsList);
                    setClientInfo(response.data.userInfo);
                })
                .catch(err => console.log(err));
        }
    },[clientId, isLoading])
    
    if(isLoading){
        return null;
    }

    return(
        <div className={styles.clientInfoPageContainer}>
            <div className={styles.clientInfoContainer}>
                <Text headerText={true}>Client name : {username}</Text>
                {setlistavailable ? 
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