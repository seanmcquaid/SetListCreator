import React, { useEffect, useState } from "react";
import axios from "axios";
import { tokenConfig } from "actions/authActions/authActions";
import {apiHost} from "config";

const SetlistCreatorPage = props => {
    const {clientId} = props.match.params;
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        if(isLoading){
            const headers = tokenConfig();
            axios.get(`${apiHost}/bandLeader/getSuggestedSetlist/${clientId}`, headers)
            .then(async response => {
                setIsLoading(false);
            })
            .catch(async err => {
                console.log(err);
            });
        }
        
    }, [isLoading, clientId])

    if(isLoading){
        return <div>LOADING</div>
    }

    return (
        <div>
            Loaded
        </div>
    )
};

export default SetlistCreatorPage;