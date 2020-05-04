import React, {useState, useEffect} from "pages/ClientPages/FinalizedSetListPage/node_modules/react";
import {tokenConfig} from "pages/ClientPages/FinalizedSetListPage/node_modules/actions/authActions/authActions";
import axios from "pages/ClientPages/FinalizedSetListPage/node_modules/axios";
import {apiHost} from "pages/ClientPages/FinalizedSetListPage/node_modules/config";
import Text from "pages/ClientPages/FinalizedSetListPage/node_modules/components/Text/Text";
import SongList from "pages/ClientPages/FinalizedSetListPage/node_modules/components/SongList/SongList";
import styles from "./FinalizedSetlistPage.module.css";

const FinalizedSetListPage = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [setListInfo, setSetListInfo] = useState({});

    useEffect(() => {
        if(isLoading){
            const headers = tokenConfig();
            axios.get(`${apiHost}/client/getCompletedSetList`, headers)
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
        <div className={styles.finalizedSetListPageContainer}>
            <Text headerText={true}>Final Set List</Text>
            <SongList list={setListInfo.suggestedSetList}/>
        </div>
    )
};

export default FinalizedSetListPage;