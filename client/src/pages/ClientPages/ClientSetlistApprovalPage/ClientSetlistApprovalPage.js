import React, {useState, useEffect, useCallback, useMemo, useRef} from "react";
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
import { useHistory } from "react-router-dom";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";

const ClientSetListApprovalPage = () => {
    const history = useHistory();

    const isMounted = useRef(true);
    
    const [isLoading, setIsLoading] = useState(true);
    const [setListInfo, setSetListInfo] = useState({});
    const [clientComments, setClientComments] = useState([]);
    const [clientComment, setClientComment] = useState("");
    const clientApprovalOptions = useMemo(() => ["Yes", "No"], []);
    const [clientApprovalStatus, setClientApprovalStatus] = useState("Yes");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const source = axios.CancelToken.source();

        if(isMounted.current){
            const headers = tokenConfig();
            axios.get(`${apiHost}/client/getCompletedSetlist`, headers)
                .then(response => {
                    const timer = setTimeout(() => {
                        setSetListInfo(response.data);
                        setIsLoading(false);
                    }, 1500);
                    return () => clearTimeout(timer);
                })
                .catch(err => {
                    const timer = setTimeout(() => {
                        setErrorMessage(err.response.data.errorMessage);
                        setIsLoading(false);
                    }, 1500);
                    return () => clearTimeout(timer);
                });
        }

        return () => {
            isMounted.current = false;
            source.cancel();
        };
    }, []);

    const clientApprovalOnChangeHandler = useCallback(event => {
        setClientApprovalStatus(event.target.value);
    },[]);

    const clientCommentOnChangeHandler = useCallback(event => {
        setClientComment(event.target.value);
    },[]);

    const addClientCommentHandler = useCallback(() => {
        setClientComments([...clientComments, clientComment]);
        setClientComment("");
    },[clientComments, clientComment]);

    const sendClientCommentsAndApproval = useCallback(() => {
        const source = axios.CancelToken.source();

        if(isMounted.current){
            setIsLoading(true);

            const headers = tokenConfig();

            const requestBody = {
                clientComments,
                clientApproval : clientApprovalStatus === "Yes" 
            };

            axios.patch(`${apiHost}/client/editCompletedSetListComments`, requestBody, headers)
                .then(() => {
                    const timer = setTimeout(() => {
                        setIsLoading(false);
                        history.push("/clientHome");
                    }, 1500);
                    return () => clearTimeout(timer);
                })
                .catch(err => {
                    const timer = setTimeout(() => {
                        setIsLoading(false);
                        setErrorMessage(err.response.data.errorMessage);
                    }, 1500);
                    return () => clearTimeout(timer);
                });
        }
        
        return () => {
            isMounted.current = false;
            source.cancel();
        }
    },[clientComments, clientApprovalStatus, history]);

    if(isLoading){
        return <LoadingSpinner isLoading={isLoading}/>
    }

    const {bandleaderComments, suggestedSetList} = setListInfo;
    
    if(errorMessage.length > 0){
        return (
            <div className={styles.clientSetListApprovalPageContainer}>
                <Text headerText={true}>Proposed Set List</Text> 
                <Text>{errorMessage}</Text>
            </div>)
    }

    return(
        <div className={styles.clientSetListApprovalPageContainer}>
            <Text headerText={true}>Proposed Set List</Text> 
            <Text>{errorMessage}</Text>
            <Dropdown
                selectedItem={clientApprovalStatus}
                name="isClientApproved"
                title="Is This Approved?"
                selectedItemOnChangeHandler={clientApprovalOnChangeHandler}
                items={clientApprovalOptions}
            />
            <Button type="button" title="Send Comments And Approval" onClick={sendClientCommentsAndApproval}/>
            <div className={styles.clientCommentsContainer}>
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
                <div className={styles.bandleaderCommentsContainer}>
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