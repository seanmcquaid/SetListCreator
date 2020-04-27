import React, { useEffect, useState } from "react";
import axios from "axios";
import { tokenConfig } from "actions/authActions/authActions";
import {apiHost} from "config";
import Text from "components/Text/Text";
import Button from "components/Button/Button";
import styles from "./SetlistCreatorPage.module.css";
import SongList from "components/SongList/SongList";
import Input from "components/Input/Input";
import CommentsList from "components/CommentsList/CommentsList";

const SetlistCreatorPage = props => {
    const {clientId} = props.match.params;
    const [isLoading, setIsLoading] = useState(true);
    const [suggestedSetList, setSuggestedSetList] = useState([]);
    const [additionalClientRequests, setAdditionalClientRequests] = useState([]);
    const [setListComment, setSetListComment] = useState("");
    const [setListComments, setSetListComments] = useState([]);

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

    const setListCommentOnChangeHandler = event => {
        setSetListComment(event.target.value);
    };

    const addSetListCommentHandler = () => {
        setSetListComments([...setListComments, setListComment]);
        setSetListComment("");
    };

    const addSongToSetlist = song => {
        setSuggestedSetList([...suggestedSetList, song]);
        setAdditionalClientRequests(additionalClientRequests.filter(additionalClientRequest => additionalClientRequest !== song));
    };

    const sendCompletedSetlist = () => {
        const headers = tokenConfig();

        const requestBody = {
            completedSetlist : suggestedSetList,
            clientId,
            bandLeaderComments : setListComments,
        };

        axios.post(`${apiHost}/bandLeader/postCompletedSetlist`, requestBody, headers)
            .then(response => {

            })
            .catch(err => {
                console.log(err);
            })
    };

    if(isLoading){
        return <div>LOADING</div>
    }

    return (
        <div className={styles.setListCreatorPageContainer}>
            <div className={styles.headerContainer}>
                <Text headerText={true}>Set List Creator</Text>
                <Button type="button" title="Send Setlist to Client" onClick={sendCompletedSetlist}/>
            </div>
            <div className={styles.commentsContainer}>
                <Text headerText={true}>Comments List</Text>
                <CommentsList list={setListComments}/>
                <Input 
                    name="setListComments"
                    title="Comments"
                    type="text"
                    placeholder="Enter comments on the setlist for the client here"
                    value={setListComment}
                    onChangeHandler={setListCommentOnChangeHandler}
                />
                <Button type="button" title="Add Comment" onClick={addSetListCommentHandler}/>
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