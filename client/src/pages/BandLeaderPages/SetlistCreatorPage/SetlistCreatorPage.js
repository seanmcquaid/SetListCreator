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
                console.log(response.data);
            })
            .catch(async err => {
                console.log(err);
            });
        }
        
    }, [isLoading, clientId])

    if(isLoading){
        return <div>LOADING</div>
    }

    // use songList component for each songList, maybe add in boolean of somesort to check if it enables adding a song? 

    return (
        <div>
            <div>
                {/* Suggested Set List here */}
            </div>
            <div>
                {/* Additional Songs here, able to add by clicking a button */}
            </div>
        </div>
    )
};

export default SetlistCreatorPage;