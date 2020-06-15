import React, { useEffect, useCallback } from "react";
import {getBandleaderClientsAction} from "actions/bandleaderActions/bandleaderActions";
import { useSelector, useDispatch } from "react-redux";
import Text from "components/Text/Text";
import ClientInfo from "components/ClientInfo/ClientInfo";
import styles from "./ClientListPage.module.css";
import { useHistory } from "react-router-dom";
import { selectBandleaderState } from "selectors/bandleaderSelectors/bandleaderSelectors";

const ClientListPage = () => {
    const {clientList} = useSelector(selectBandleaderState);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getBandleaderClientsAction());
    },[dispatch]);


    const clientPageRedirect = useCallback(clientId => {
        history.push(`/bandleader/clientInfo/${clientId}`);
    },[history]);
    
    const clientFinalSetListPageRedirect = useCallback(clientId => {
        history.push(`/bandleader/clientFinalSetList/${clientId}`);
    },[history]);

    const clientEditSetListPageRedirect = useCallback(clientId => {
        history.push(`/bandleader/clientEditSetList/${clientId}`);
    },[history]);
    
    return(
        <div className={styles.clientListPageContainer}>
            <Text headerText>Clients Page</Text>
            <div className={styles.clientsContainer}>
                {clientList.map(clientInfo => 
                    <ClientInfo 
                        key={clientInfo.id} 
                        clientName={clientInfo.username} 
                        setListAvailable={clientInfo.setlistavailable}
                        clientPageRedirect={() => clientPageRedirect(clientInfo.id)}
                        clientFinalSetListPageRedirect={() => clientFinalSetListPageRedirect(clientInfo.id)}
                        clientApproved={clientInfo.clientapproved}
                        clientEditSetListPageRedirect={() => clientEditSetListPageRedirect(clientInfo.id)}
                    />
                )}
            </div>
        </div>
    )
};

export default ClientListPage;