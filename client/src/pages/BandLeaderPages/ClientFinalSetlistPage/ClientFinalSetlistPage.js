import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiHost } from "config";
import { tokenConfig } from "actions/authActions/authActions";

const ClientFinalSetlistPage = props => {
    const {clientId} = props.match.params;
    const [isLoading, setIsLoading] = useState(true);
    const [clientSetlistInfo, setClientSetlistInfo] = useState({});

    useEffect(() => {
        if(isLoading){
            const headers = tokenConfig();
            axios.get(`${apiHost}/bandLeader/getClientSetlistInfo/${clientId}`, headers)
                .then(response => {
                    console.log(response);
                    setIsLoading(false);
                })
                .catch(err => console.log(err));
        }
    },[clientId, isLoading])
    
    return (
        <div>

        </div>
    )
};

export default ClientFinalSetlistPage;