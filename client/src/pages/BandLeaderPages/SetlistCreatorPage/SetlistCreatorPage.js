import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { tokenConfig } from "actions/authActions/authActions";
import {apiHost} from "config";
import Text from "components/Text/Text";
import Button from "components/Button/Button";
import styles from "./SetListCreatorPage.module.css";
import SongList from "components/SongList/SongList";
import Input from "components/Input/Input";
import CommentsList from "components/CommentsList/CommentsList";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { useHistory } from "react-router-dom";

const SetListCreatorPage = props => {
    const {clientId} = props.match.params;
    const history = useHistory();

    const isMounted = useRef(true);

    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [suggestedSetList, setSuggestedSetList] = useState([]);
    const [additionalClientRequests, setAdditionalClientRequests] = useState([]);
    const [setListComment, setSetListComment] = useState("");
    const [setListComments, setSetListComments] = useState([]);

    useEffect(() => {
        if(isMounted.current){
            const headers = tokenConfig();
            axios.get(`${apiHost}/bandleader/getSuggestedSetList/${clientId}`, headers)
                .then(response => {
                    const timer = setTimeout(() => {
                        setSuggestedSetList(response.data.suggestedSetList);
                        setAdditionalClientRequests(response.data.additionalClientRequests);
                        setIsLoading(false)
                    }, 1500);
                    return () => clearTimeout(timer);
                })
                .catch(err => {
                    const timer = setTimeout(() => {
                        setErrorMessage(err.response.data.errorMessage);
                        setIsLoading(false);
                    }, 1500);
                    return () => clearTimeout(timer);
                })
        }
        
        return () => {
            isMounted.current = false;
        };
    }, [clientId]);

    const setListCommentOnChangeHandler = useCallback(event => {
        setSetListComment(event.target.value);
    },[]);

    const addSetListCommentHandler = useCallback(() => {
        setSetListComments([...setListComments, setListComment]);
        setSetListComment("");
    },[setListComments, setListComment]);

    const addSongToSetlist = useCallback(song => {
        setSuggestedSetList([...suggestedSetList, song]);
        setAdditionalClientRequests(additionalClientRequests.filter(additionalClientRequest => additionalClientRequest !== song));
    },[suggestedSetList, additionalClientRequests]);

    const sendCompletedSetlist = useCallback(() => {
        const headers = tokenConfig();

        const requestBody = {
            completedSetList : suggestedSetList,
            clientId,
            bandleaderComments : setListComments,
        };

        axios.post(`${apiHost}/bandleader/postCompletedSetList`, requestBody, headers)
            .then(() => {
                history.push("/bandleaderHome")
            })
            .catch(err => {
                setErrorMessage(err.response.data.errorMessage);
            });
    },[suggestedSetList, clientId, setListComments, history]);

    if(isLoading){
        return <LoadingSpinner isLoading={isLoading}/>;
    }

    return (
        <div className={styles.setListCreatorPageContainer}>
            <div className={styles.headerContainer}>
                <Text headerText={true}>Set List Creator</Text>
                <Text>{errorMessage}</Text>
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
                    <Text headerText={true}>Suggested Set List</Text>
                    <SongList list={suggestedSetList}/>
                </div>
                <div className={styles.additionalClientRequestsContainer}>
                    <Text headerText={true}>Additional Client Requests</Text>
                    <SongList list={additionalClientRequests} songOnClick={addSongToSetlist}/>
                </div>
            </div>
        </div>
    )
};

export default SetListCreatorPage;