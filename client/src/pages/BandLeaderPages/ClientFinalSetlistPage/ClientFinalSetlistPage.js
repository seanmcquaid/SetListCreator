import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiHost } from "config";
import { tokenConfig } from "actions/authActions/authActions";
import SongList from "components/SongList/SongList";
import Text from "components/Text/Text";
import styles from "./ClientFinalSetlistPage.module.css";

const ClientFinalSetlistPage = props => {
    const {clientId} = props.match.params;
    const [isLoading, setIsLoading] = useState(true);
    const [clientSetlistInfo, setClientSetlistInfo] = useState({});

    useEffect(() => {
        if(isLoading){
            const headers = tokenConfig();
            axios.get(`${apiHost}/bandLeader/getClientSetlistInfo/${clientId}`, headers)
                .then(response => {
                    setClientSetlistInfo(response.data);
                    setIsLoading(false);
                })
                .catch(err => console.log(err));
        }
    },[clientId, isLoading])

    if(isLoading){
        return <div>Loading</div>
    }
    
    return (
        <div className={styles.clientFinalSetlistPageContainer}>
            <Text headerText={true}>Final Setlist For {clientSetlistInfo.clientName}</Text>
            <SongList list={clientSetlistInfo.suggestedSetList}/>
        </div>
    )
};

export default ClientFinalSetlistPage;