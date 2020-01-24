import React, { useEffect } from "react";
import { tokenConfig } from "actions/authActions/authActions";
import {apiHost} from "config";
import axios from "axios";

const ClientInfoPage = props => {
    const {clientId} = props.match.params;

    useEffect(() => {
        const headers = tokenConfig();
        axios.get(`${apiHost}/users/getClientInfo/${clientId}`, headers)
            .then(clientInfo => {
                // grab client info from here
                axios.get(`${apiHost}/bandLeader/${clientInfo.username}`, headers)
                    .then(clientSongs => {
                        console.log(clientSongs);
                    })
            })
            .catch(err => console.log(err))
    },[])

    return(
        <div>
            Client Info Here
        </div>
    )
};

export default ClientInfoPage;