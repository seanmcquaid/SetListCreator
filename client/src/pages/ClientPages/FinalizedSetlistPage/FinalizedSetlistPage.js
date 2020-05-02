import React, {useState, useEffect} from "react";
import {tokenConfig} from "actions/authActions/authActions";
import axios from "axios";
import {apiHost} from "config";
import Text from "components/Text/Text";
import SongList from "components/SongList/SongList";
import styles from "./FinalizedSetlistPage.module.css";

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

    console.log(setListInfo)

    if(isLoading){
        return <div>Loading</div>
    }

    return (
        <div className={styles.finalizedSetlistPageContainer}>
            <Text headerText={true}>Final Setlist</Text>
            <SongList list={setListInfo.suggestedSetList}/>
        </div>
    )
};

export default FinalizedSetlistPage;