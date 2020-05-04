import React, { useEffect } from "pages/BandleaderPages/ClientListPage/node_modules/react";
import {getBandleaderClientsAction} from "pages/BandleaderPages/ClientListPage/node_modules/actions/bandleaderActions/bandleaderActions";
import { connect } from "pages/BandleaderPages/ClientListPage/node_modules/react-redux";
import Text from "pages/BandleaderPages/ClientListPage/node_modules/components/Text/Text";
import ClientInfo from "pages/BandleaderPages/ClientListPage/node_modules/components/ClientInfo/ClientInfo";
import styles from "./ClientListPage.module.css";

const ClientListPage = props => {
    const {clientList, getBandleaderClientsAction} = props;

    useEffect(() => {
        getBandleaderClientsAction();
    },[getBandleaderClientsAction])


    const clientPageRedirect = async clientId => {
        await props.history.push(`/clientInfo/${clientId}`);
    };
    
    const clientFinalSetlistPageRedirect = async clientId => {
        await props.history.push(`/bandLeader/clientFinalSetlist/${clientId}`);
    };

    console.log(clientList)

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
                        clientFinalSetlistPageRedirect={() => clientFinalSetlistPageRedirect(clientInfo.id)}
                        clientApproved={clientInfo.clientapproved}
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