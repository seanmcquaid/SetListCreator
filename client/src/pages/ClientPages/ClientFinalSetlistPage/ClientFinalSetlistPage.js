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

    if(isLoading){
        return <div>Loading</div>
    }

    const {bandLeaderComments, bandLeaderName, clientName, suggestedSetList} = setListInfo;

    return(
        <div>
            <Text headerText={true}>Final Setlist</Text>
            <div>
                <Text headerText={true}>Client Comments List</Text>
                <CommentsList list={clientComments}/>
                <Input 
                    name="clientComments"
                    title="Comments"
                    type="text"
                    placeholder="Enter comments on the setlist for the bandleader here"
                    value={clientComment}
                    onChangeHandler={clientCommentOnChangeHandler}
                />
                <Button type="button" title="Add Comment" onClick={addClientCommentHandler}/>
            </div>
            <div>
                <div>
                    <Text headerText={true}>Band Leader Comments</Text>
                    <CommentsList list={bandLeaderComments}/>
                </div>
                <div>
                    <Text headerText={true}>Suggested Setlist</Text>
                    <SongList list={suggestedSetList}/>
                </div>
            </div>
        </div>
    )
};

export default ClientFinalSetlistPage;