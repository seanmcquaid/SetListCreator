import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiHost } from "config";
import { tokenConfig } from "actions/authActions/authActions";
import SongList from "components/SongList/SongList";
import Text from "components/Text/Text";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import styles from "./ClientFinalSetListPage.module.css";

const ClientFinalSetListPage = props => {
    const {clientId} = props.match.params;
    const [isLoading, setIsLoading] = useState(true);
    const [clientSetListInfo, setClientSetListInfo] = useState({});

    useEffect(() => {
        if(isLoading){
            const headers = tokenConfig();
            axios.get(`${apiHost}/bandleader/getClientSetListInfo/${clientId}`, headers)
                .then(response => {
                    setClientSetListInfo(response.data);
                })
                .catch(err => console.log(err));
            const timer = setTimeout(() => setIsLoading(false), 1500);
            return () => clearTimeout(timer);
        }
    },[clientId, isLoading])

    if(isLoading){
        return <LoadingSpinner isLoading={isLoading}/>;
    }
    
    return (
        <div className={styles.clientFinalSetListPageContainer}>
            <Text headerText={true}>Final Set List For {clientSetListInfo.clientName}</Text>
            <SongList list={clientSetListInfo.suggestedSetList}/>
        </div>
    )
};

export default ClientFinalSetListPage;