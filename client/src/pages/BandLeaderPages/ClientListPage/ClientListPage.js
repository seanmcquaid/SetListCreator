import React, { useEffect } from "react";
import {getBandleaderClientsAction} from "actions/bandleaderActions/bandleaderActions";
import { connect } from "react-redux";
import Text from "components/Text/Text";
import ClientInfo from "components/ClientInfo/ClientInfo";
import styles from "./ClientListPage.module.css";

const ClientListPage = props => {
    const {clientList, getBandleaderClientsAction} = props;

    useEffect(() => {
        getBandleaderClientsAction();
    },[getBandleaderClientsAction])


    const clientPageRedirect = async clientId => {
        await props.history.push(`/bandleader/clientInfo/${clientId}`);
    };
    
    const clientFinalSetListPageRedirect = async clientId => {
        await props.history.push(`/bandleader/clientFinalSetList/${clientId}`);
    };

    const clientEditSetListPageRedirect = async clientId => {
        await props.history.push(`/bandleader/clientEditSetList/${clientId}`);
    };
    
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

const mapStateToProps = state => ({
    clientList : state.bandleader.clientList
});

const mapDispatchToProps = dispatch => ({
    getBandleaderClientsAction : () => dispatch(getBandleaderClientsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientListPage);