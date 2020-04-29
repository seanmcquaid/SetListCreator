import React, {useState, useEffect} from "react";
import styles from "./ClientFinalSetlistPage.module.css";
import axios from "axios";
import { tokenConfig } from "actions/authActions/authActions";
import {apiHost} from "config";
import Text from "components/Text/Text";
import CommentsList from "components/CommentsList/CommentsList";
import SongList from "components/SongList/SongList";
import Input from "components/Input/Input";
import Button from "components/Button/Button";

const ClientFinalSetlistPage = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [setListInfo, setSetListInfo] = useState({});
    const [clientComments, setClientComments] = useState([]);
    const [clientComment, setClientComment] = useState("");

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

    const clientCommentOnChangeHandler = event => {
        setClientComment(event.target.value);
    };

    const addClientCommentHandler = () => {
        setClientComments([...clientComments, clientComment]);
        setClientComment("");
    };

    const sendClientComments = () => {
        const headers = tokenConfig();

        const requestBody = {
            clientComments
        };

        axios.patch(`${apiHost}/editCompletedSetlistComments`, requestBody, headers)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
    };

    if(isLoading){
        return <div>Loading</div>
    }

    const {bandLeaderComments, suggestedSetList} = setListInfo;

    return(
        <div className={styles.clientFinalSetlistPageContainer}>
            <Text headerText={true}>Final Setlist</Text>
            <Button type="button" title="Send Comments" onClick={sendClientComments}/>
            <div className={styles.commentsContainer}>
                <Text headerText={true}>Client Comments List</Text>
                <CommentsList list={clientComments}/>
                <Input 
                    name="clientComments"
                    title="Add Comments"
                    type="text"
                    placeholder="Enter comments on the setlist for the bandleader here"
                    value={clientComment}
                    onChangeHandler={clientCommentOnChangeHandler}
                />
                <Button type="button" title="Add Comment" onClick={addClientCommentHandler}/>
            </div>
            <div className={styles.listsContainer}>
                <div className={styles.commentsContainer}>
                    <Text headerText={true}>Band Leader Comments</Text>
                    <CommentsList list={bandLeaderComments}/>
                </div>
                <div className={styles.songsContainer}>
                    <Text headerText={true}>Suggested Setlist</Text>
                    <SongList list={suggestedSetList}/>
                </div>
            </div>
        </div>
    )
};

export default ClientFinalSetlistPage;