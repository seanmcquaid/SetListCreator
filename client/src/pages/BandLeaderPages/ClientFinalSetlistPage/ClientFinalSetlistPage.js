import React, { useEffect, useState } from "pages/BandleaderPages/ClientFinalSetListPage/node_modules/react";
import axios from "pages/BandleaderPages/ClientFinalSetListPage/node_modules/axios";
import { apiHost } from "pages/BandleaderPages/ClientFinalSetListPage/node_modules/config";
import { tokenConfig } from "pages/BandleaderPages/ClientFinalSetListPage/node_modules/actions/authActions/authActions";
import SongList from "pages/BandleaderPages/ClientFinalSetListPage/node_modules/components/SongList/SongList";
import Text from "pages/BandleaderPages/ClientFinalSetListPage/node_modules/components/Text/Text";
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
                    setIsLoading(false);
                })
                .catch(err => console.log(err));
        }
    },[clientId, isLoading])

    if(isLoading){
        return <div>Loading</div>
    }
    
    return (
        <div className={styles.clientFinalSetListPageContainer}>
            <Text headerText={true}>Final Set List For {clientSetListInfo.clientName}</Text>
            <SongList list={clientSetListInfo.suggestedSetList}/>
        </div>
    )
};

export default ClientFinalSetListPage;