import React, {useState, useEffect} from "react";
import styles from "./ClientSetListApprovalPage.module.css";
import axios from "axios";
import { tokenConfig } from "actions/authActions/authActions";
import {apiHost} from "config";
import Text from "components/Text/Text";
import CommentsList from "components/CommentsList/CommentsList";
import SongList from "components/SongList/SongList";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import Dropdown from "components/Dropdown/Dropdown";
import { Redirect } from "react-router-dom";

const ClientSetListApprovalPage = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [setListInfo, setSetListInfo] = useState({});
    const [clientComments, setClientComments] = useState([]);
    const [clientComment, setClientComment] = useState("");
    const [clientApprovalOptions, setClientApprovalOptions] = useState(["Yes", "No"]);
    const [clientApprovalStatus, setClientApprovalStatus] = useState("Yes");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if(isLoading){
            const headers = tokenConfig();
            axios.get(`${apiHost}/client/getCompletedSetlist`, headers)
                .then(response => {
                    setSetListInfo(response.data);
                    setIsLoading(false);
                })
                .catch(err => {
                    setErrorMessage(err.response.data.errorMessage);
                    setIsLoading(false);
                });
        }
    }, [isLoading]);

    const clientApprovalOnChangeHandler = event => {
        setClientApprovalStatus(event.target.value);
    };

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
            clientComments,
            clientApproval : clientApprovalStatus === "Yes" 
        };

        axios.patch(`${apiHost}/client/editCompletedSetListComments`, requestBody, headers)
            .then(response => {
                console.log(response);
                setIsLoading(true);
            })
            .catch(err => {
                console.log(err.response);
            })
    };

    if(isLoading){
        return <div>Loading</div>
    }

    if(setListInfo.clientapproved){
        return <Redirect to={`/client/finalizedSetList`}/>
    }

    if(errorMessage.length > 0){
        return <div>{errorMessage}</div>
    }

    const {bandleaderComments, suggestedSetList} = setListInfo;

    return(
        <div className={styles.clientFinalSetListPageContainer}>
            <Text headerText={true}>Final Set List</Text>
            <Dropdown
                selectedItem={clientApprovalStatus}
                name="isClientApproved"
                title="Is This Approved?"
                selectedItemOnChangeHandler={clientApprovalOnChangeHandler}
                items={clientApprovalOptions}
            />
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
                    <Text headerText={true}>Band leader Comments</Text>
                    <CommentsList list={bandleaderComments}/>
                </div>
                <div className={styles.songsContainer}>
                    <Text headerText={true}>Suggested Set List</Text>
                    <SongList list={suggestedSetList}/>
                </div>
            </div>
        </div>
    )
};

export default ClientSetListApprovalPage;