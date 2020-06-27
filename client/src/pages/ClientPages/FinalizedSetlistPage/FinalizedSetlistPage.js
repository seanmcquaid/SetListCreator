import React, {useState, useEffect, useRef} from "react";
import {tokenConfig} from "actions/authActions/authActions";
import axios from "axios";
import {apiHost} from "config";
import Text from "components/Text/Text";
import SongList from "components/SongList/SongList";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import styles from "./FinalizedSetListPage.module.css";

const FinalizedSetListPage = () => {
    const isMounted = useRef(false);
    const [isLoading, setIsLoading] = useState(true);
    const [setListInfo, setSetListInfo] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if(isMounted){
            const headers = tokenConfig();
            axios.get(`${apiHost}/client/getCompletedSetList`, headers)
                .then(response => {
                    setSetListInfo(response.data);
                    const timer = setTimeout(() => setIsLoading(false), 1500);
                    return () => clearTimeout(timer);
                })
                .catch(() => {
                    setErrorMessage("There was a problem getting the completed set list, try again")
                    const timer = setTimeout(() => setIsLoading(false), 1500);
                    return () => clearTimeout(timer);
                });
            
            return () => {
                isMounted.current = false;
            };
        }
    }, []);

    if(isLoading){
        return <LoadingSpinner isLoading={isLoading}/>;
    }

    return (
        <div className={styles.finalizedSetListPageContainer}>
            <Text headerText={true}>Final Set List</Text>
            <Text>{errorMessage}</Text>
            <SongList list={setListInfo.suggestedSetList}/>
        </div>
    )
};

export default FinalizedSetListPage;