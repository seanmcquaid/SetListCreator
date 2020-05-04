import React, {useState, useEffect} from "pages/ClientPages/ClientSetListApprovalPage/node_modules/react";
import styles from "./ClientSetlistApprovalPage.module.css";
import axios from "pages/ClientPages/ClientSetListApprovalPage/node_modules/axios";
import { tokenConfig } from "pages/ClientPages/ClientSetListApprovalPage/node_modules/actions/authActions/authActions";
import {apiHost} from "pages/ClientPages/ClientSetListApprovalPage/node_modules/config";
import Text from "pages/ClientPages/ClientSetListApprovalPage/node_modules/components/Text/Text";
import CommentsList from "pages/ClientPages/ClientSetListApprovalPage/node_modules/components/CommentsList/CommentsList";
import SongList from "pages/ClientPages/ClientSetListApprovalPage/node_modules/components/SongList/SongList";
import Input from "pages/ClientPages/ClientSetListApprovalPage/node_modules/components/Input/Input";
import Button from "pages/ClientPages/ClientSetListApprovalPage/node_modules/components/Button/Button";
import Dropdown from "pages/ClientPages/ClientSetListApprovalPage/node_modules/components/Dropdown/Dropdown";
import { Redirect } from "pages/ClientPages/ClientSetListApprovalPage/node_modules/react-router-dom";

const ClientSetListApprovalPage = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [setListInfo, setSetListInfo] = useState({});
    const [clientComments, setClientComments] = useState([]);
    const [clientComment, setClientComment] = useState("");
    const [clientApprovalOptions, setClientApprovalOptions] = useState(["Yes", "No"]);
    const [clientApprovalStatus, setClientApprovalStatus] = useState("Yes");

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
                console.log(err);
            })
    };

    if(isLoading){
        return <div>Loading</div>
    }

    if(setListInfo.clientapproved){
        return <Redirect to={`/client/finalizedSetList`}/>
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
                    <Text headerText={true}>Suggested Setlist</Text>
                    <SongList list={suggestedSetList}/>
                </div>
            </div>
        </div>
    )
};

export default ClientSetListApprovalPage;