import React from "react";

const ClientInfoPage = props => {
    const {clientId} = props.match.params;

    // use effect to get client set list - set up back end

    return(
        <div>
            Client Info Here
        </div>
    )
};

export default ClientInfoPage;