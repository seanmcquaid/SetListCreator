import React, {useState, useEffect} from "react";
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

const EditClientSetListPage = props => {
    const {clientId} = props.match.params;
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
            .then(async response => {
                setSuggestedSetList(response.data.suggestedSetList);
                setAdditionalClientRequests(response.data.additionalClientRequests);
                setClientComments(response.data.clientComments);
            })
            .catch(async err => {
                console.log(err);
            });
            const timer = setTimeout(() => setIsLoading(false), 1500);
            return () => clearTimeout(timer);
        }
        
    }, [isLoading, clientId]);

    const bandleaderCommentOnChangeHandler = event => {
        setBandleaderComment(event.target.value);
    };

    const addBandleaderCommentHandler = () => {
        setBandleaderComments([...bandleaderComments, bandleaderComment]);
        setBandleaderComment("");
    };

    const addSongToSetList = song => {
        setSuggestedSetList([...suggestedSetList, song]);
        setAdditionalClientRequests(additionalClientRequests.filter(additionalClientRequest => additionalClientRequest !== song));
    };

    const sendEditedSetList = () => {
        const headers = tokenConfig();

        const requestBody = {
            completedSetList : suggestedSetList,
            clientId,
            bandleaderComments : bandleaderComments,
        };

        axios.patch(`${apiHost}/bandleader/editCompletedSetList`, requestBody, headers)
            .then(response => {

            })
            .catch(err => {
                console.log(err);
            })
    };

    if(isLoading){
        return <LoadingSpinner isLoading={isLoading}/>;
    }

    return (
        <div className={styles.clientEditSetListPageContainer}>
            <div className={styles.headerContainer}>
                <Text headerText={true}>Set List Creator</Text>
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