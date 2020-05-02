import React, {useState, useEffect} from "react";
import {tokenConfig} from "actions/authActions/authActions";
import axios from "axios";
import {apiHost} from "config";

const FinalizedSetlistPage = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [setListInfo, setSetListInfo] = useState({});

    useEffect(() => {
        if(isLoading){
            const headers = tokenConfig();
            axios.get(`${apiHost}/client/getCompletedSetlist`, headers)
                .then(response => {
                    setSetListInfo(response.data);
                    setIsLoading(false);
                })
                .catch(err => console.log(err));
        }
    }, [isLoading]);

    if(isLoading){
        return <div>Loading</div>
    }

    return (
        <div>
            
        </div>
    )
};

export default FinalizedSetlistPage;