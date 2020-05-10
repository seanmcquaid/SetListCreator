import React, {useState, useEffect} from "react";
import {tokenConfig} from "actions/authActions/authActions";
import axios from "axios";
import {apiHost} from "config";
import Text from "components/Text/Text";
import SongList from "components/SongList/SongList";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import styles from "./FinalizedSetListPage.module.css";

const FinalizedSetListPage = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [setListInfo, setSetListInfo] = useState({});

    useEffect(() => {
        if(isLoading){
            const headers = tokenConfig();
            axios.get(`${apiHost}/client/getCompletedSetList`, headers)
                .then(response => {
                    setSetListInfo(response.data);
                })
                .catch(err => console.log(err));
            const timer = setTimeout(() => setIsLoading(false), 1500);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if(isLoading){
        return <LoadingSpinner isLoading={isLoading}/>;
    }

    return (
        <div className={styles.finalizedSetListPageContainer}>
            <Text headerText={true}>Final Set List</Text>
            <SongList list={setListInfo.suggestedSetList}/>
        </div>
    )
};

export default FinalizedSetListPage;