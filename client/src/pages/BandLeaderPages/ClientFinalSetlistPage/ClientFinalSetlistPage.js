import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { apiHost } from "config";
import { tokenConfig } from "actions/authActions/authActions";
import SongList from "components/SongList/SongList";
import Text from "components/Text/Text";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import styles from "./ClientFinalSetListPage.module.css";

const ClientFinalSetListPage = props => {
    const {clientId} = props.match.params;

    const isMounted = useRef(true);

    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [clientSetListInfo, setClientSetListInfo] = useState({});

    useEffect(() => {
        if(isMounted.current){
            const headers = tokenConfig();
            axios.get(`${apiHost}/bandleader/getClientSetListInfo/${clientId}`, headers)
                .then(response => {
                    const timer = setTimeout(() => {
                        setClientSetListInfo(response.data);
                        setIsLoading(false);
                    }, 1500);
                    return () => clearTimeout(timer);
                })
                .catch(err => {
                    const timer = setTimeout(() => {
                        setErrorMessage(err.response.data.errorMessage);
                        setIsLoading(false);
                    }, 1500);
                    return () => clearTimeout(timer);
                });
        }

        return () => {
            isMounted.current = false;
        }
    },[clientId]);

    if(isLoading){
        return <LoadingSpinner isLoading={isLoading}/>;
    }
    
    return (
        <div className={styles.clientFinalSetListPageContainer}>
            <Text headerText={true}>Final Set List For {clientSetListInfo.clientName}</Text>
            {
                errorMessage.length > 0 ? 
                    <Text>{errorMessage}</Text> :
                    <SongList list={clientSetListInfo.suggestedSetList}/>
            }
        </div>
    )
};

export default ClientFinalSetListPage;