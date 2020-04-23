import React, { useEffect, useState } from "react";
import axios from "axios";
import { tokenConfig } from "actions/authActions/authActions";
import {apiHost} from "config";
import Text from "components/Text/Text";
import Button from "components/Button/Button";
import styles from "./SetlistCreatorPage.module.css";
import SongList from "components/SongList/SongList";

const SetlistCreatorPage = props => {
    const {clientId} = props.match.params;
    const [isLoading, setIsLoading] = useState(true);
    const [suggestedSetList, setSuggestedSetList] = useState([]);
    const [additionalClientRequests, setAdditionalClientRequests] = useState([]);

    useEffect(() => {
        if(isLoading){
            const headers = tokenConfig();
            axios.get(`${apiHost}/bandLeader/getSuggestedSetlist/${clientId}`, headers)
            .then(async response => {
                setIsLoading(false);
                setSuggestedSetList(response.data.suggestedSetList);
                setAdditionalClientRequests(response.data.additionalClientRequests);
            })
            .catch(async err => {
                console.log(err);
            });
        }
        
    }, [isLoading, clientId]);

    const addSongToSetlist = song => {
        setSuggestedSetList([...suggestedSetList, song]);
        setAdditionalClientRequests(additionalClientRequests.filter(additionalClientRequest => additionalClientRequest !== song));
    };

    if(isLoading){
        return <div>LOADING</div>
    }

    // use songList component for each songList, maybe add in boolean of somesort to check if it enables adding a song? 

    return (
        <div className={styles.setListCreatorPageContainer}>
            <div className={styles.headerContainer}>
                <Text headerText={true}>Set List Creator</Text>
                <Button type="button" title="Send Setlist to Client" onClick={() => console.log("placeholder until I create the architecture for the backend")}/>
            </div>
            <div className={styles.songsContainer}>
                <div className={styles.suggestedSetListContainer}>
                    <SongList list={suggestedSetList}/>
                </div>
                <div className={styles.additionalClientRequestsContainer}>
                    <SongList list={additionalClientRequests} songOnClick={addSongToSetlist}/>
                </div>
            </div>
        </div>
    )
};

export default SetlistCreatorPage;