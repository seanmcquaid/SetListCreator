import React, { useEffect } from "react";
import { tokenConfig } from "actions/authActions/authActions";
import {apiHost} from "config";
import axios from "axios";

const ClientInfoPage = props => {
    const {clientId} = props.match.params;

    useEffect(() => {
        const headers = tokenConfig();
        axios.get(`${apiHost}/bandLeader/getClientSongs/${clientId}`, headers)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => console.log(err));
    },[clientName])

    return(
        <div>
            Client Info Here
        </div>
    )
};

export default ClientInfoPage;