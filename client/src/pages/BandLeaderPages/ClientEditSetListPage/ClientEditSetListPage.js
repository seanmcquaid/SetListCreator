import React, {useState, useEffect, useCallback} from "react";
import {tokenConfig} from "actions/authActions/authActions";
import {apiHost} from "config";
import styles from "./ClientEditSetListPage.module.css";
import axios from "axios";
import Text from "components/Text/Text";
import Button from "components/Button/Button";
import CommentsList from "components/CommentsList/CommentsList";
import Input from "components/Input/Input";
import SongList from "components/SongList/SongList";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { useHistory } from "react-router-dom";

const EditClientSetListPage = props => {
    const {clientId} = props.match.params;
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(true);
    const [suggestedSetList, setSuggestedSetList] = useState([]);
    const [additionalClientRequests, setAdditionalClientRequests] = useState([]);
    const [bandleaderComment, setBandleaderComment] = useState("");
    const [bandleaderComments, setBandleaderComments] = useState([]);
    const [clientComments, setClientComments] = useState([]);

    useEffect(() => {
        if(isLoading){
            const headers = tokenConfig();
            axios.get(`${apiHost}/bandleader/getSuggestedSetList/${clientId}`, headers)
            .then(response => {
                setSuggestedSetList(response.data.suggestedSetList);
                setAdditionalClientRequests(response.data.additionalClientRequests);
                setClientComments(response.data.clientComments);
            })
            .catch(err => {
                console.log(err);
            });
            const timer = setTimeout(() => setIsLoading(false), 1500);
            return () => clearTimeout(timer);
        }
        
    }, [isLoading, clientId]);

    const bandleaderCommentOnChangeHandler = useCallback(event => {
        setBandleaderComment(event.target.value);
    },[]);

    const addBandleaderCommentHandler = useCallback(() => {
        setBandleaderComments([...bandleaderComments, bandleaderComment]);
        setBandleaderComment("");
    },[bandleaderComments, bandleaderComment]);

    const addSongToSetList = useCallback(song => {
        setSuggestedSetList([...suggestedSetList, song]);
        setAdditionalClientRequests(additionalClientRequests.filter(additionalClientRequest => additionalClientRequest !== song));
    },[suggestedSetList, additionalClientRequests]);

    const sendEditedSetList = useCallback(() => {
        const headers = tokenConfig();

        const requestBody = {
            completedSetList : suggestedSetList,
            clientId,
            bandleaderComments : bandleaderComments,
        };

        axios.patch(`${apiHost}/bandleader/editCompletedSetList`, requestBody, headers)
            .then(response => {
                history.push("/bandleaderHome")
            })
            .catch(err => {
                console.log(err);
            })
    },[suggestedSetList, bandleaderComments, clientId, history]);

    if(isLoading){
        return <LoadingSpinner isLoading={isLoading}/>;
    }

    return (
        <div className={styles.clientEditSetListPageContainer}>
            <div className={styles.headerContainer}>
                <Text headerText={true}>Edit Client Set List</Text>
                <Button type="button" title="Send Setlist to Client" onClick={sendEditedSetList}/>
            </div>
            <div className={styles.allCommentsContainer}>
                <div className={styles.commentsContainer}>
                    <Text headerText={true}>Bandleader Comments</Text>
                    <CommentsList list={bandleaderComments}/>
                    <Input 
                        name="bandleaderComments"
                        title="Comments"
                        type="text"
                        placeholder="Enter comments on the setlist for the client here"
                        value={bandleaderComment}
                        onChangeHandler={bandleaderCommentOnChangeHandler}
                    />
                    <Button type="button" title="Add Comment" onClick={addBandleaderCommentHandler}/>
                </div>
                <div className={styles.commentsContainer}>
                    <Text headerText={true}>Client Comments</Text>
                    <CommentsList list={clientComments}/>
                </div>
            </div>
            <div className={styles.songsContainer}>
                <div className={styles.suggestedSetListContainer}>
                    <Text headerText={true}>Suggested Set List</Text>
                    <SongList list={suggestedSetList}/>
                </div>
                <div className={styles.additionalClientRequestsContainer}>
                    <Text headerText={true}>Additional Client Requests</Text>
                    <SongList list={additionalClientRequests} songOnClick={addSongToSetList}/>
                </div>
            </div>
        </div>
    )
};

export default EditClientSetListPage;