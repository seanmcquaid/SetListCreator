import React, { useEffect } from "react";
import {getBandleaderClientsAction} from "actions/bandLeaderActions/bandLeaderActions";
import { connect } from "react-redux";
import Text from "components/Text/Text";
import ClientInfo from "components/ClientInfo/ClientInfo";

const ClientListPage = props => {
    const {clientList, getBandleaderClientsAction} = props;

    useEffect(() => {
        getBandleaderClientsAction();
    },[getBandleaderClientsAction])

    console.log(clientList)

    return(
        <div>
            <Text headerText>Clients Page</Text>
            <div>
                {clientList.map(clientInfo => 
                    <ClientInfo 
                        key={clientInfo.id} 
                        clientName={clientInfo.username} 
                        setListAvailable={clientInfo.setlistavailable}
                    />
                )}
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    clientList : state.bandLeader.clientList
});

const mapDispatchToProps = dispatch => ({
    getBandleaderClientsAction : () => dispatch(getBandleaderClientsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientListPage);