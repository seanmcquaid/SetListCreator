import React, { useEffect, useState } from "react";
import { tokenConfig } from "actions/authActions/authActions";
import {apiHost} from "config";
import axios from "axios";
import SongList from "components/SongList/SongList";
import LinkButton from "components/LinkButton/LinkButton";

const ClientInfoPage = props => {
    const {clientId} = props.match.params;
    const [isLoading, setIsLoading] = useState(true);
    const [requestedSongsList, setRequestedSongsList] = useState([]);
    const [doNotPlaySongsList, setDoNotPlaySongsList] = useState([]);
    const [clientInfo, setClientInfo] = useState({});
    const {username, setlistavailable} = clientInfo;

    useEffect(() => {
        if(isLoading){
            const headers = tokenConfig();
            axios.get(`${apiHost}/bandLeader/getClientSongs/${clientId}`, headers)
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
        return <div>Loading</div>;
    }

    return(
        <div>
            <div>
                <p>Client name : {username}</p>
                <p>Setlist Status : {String(setlistavailable)}</p>
                {setlistavailable ? <LinkButton route="/">Create Setlist</LinkButton> : null}
            </div>
            <div>
                <div>
                    requestedSongsList
                    <SongList list={requestedSongsList}/>
                </div>
                <div>
                    doNotPlaySongsList
                    <SongList list={doNotPlaySongsList}/>
                </div>
            </div>
        </div>
    )
};

export default ClientInfoPage;