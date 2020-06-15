import React, {useState, useEffect, useCallback} from "react";
import styles from "./ClientProfilePage.module.css";
import Text from "components/Text/Text";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import {useSelector, useDispatch} from "react-redux";
import {editUserInfoAction, getUserInfoAction} from "actions/authActions/authActions";
import { selectAuthState } from "selectors/authSelectors/authSelectors";
import { selectErrorState } from "selectors/errorSelectors/errorSelectors";
import { useHistory } from "react-router-dom";

const ClientProfilePage = () => {
    const {username} = useSelector(selectAuthState);
    const {errorMessage} = useSelector(selectErrorState);

    const dispatch = useDispatch();
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(true);
    const [currentUsername, setCurrentUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if(currentUsername === "" && isLoading){
            dispatch(getUserInfoAction());
            setCurrentUsername(username);
        }
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    },[username, currentUsername, dispatch, isLoading])

    const currentUserNameOnChangeHandler = useCallback(event => {
        setCurrentUsername(event.target.value);
    },[]);

    const passwordOnChangeHandler = useCallback(event => {
        setPassword(event.target.value);
    },[]);

    const confirmPasswordOnChangeHandler = useCallback(event => {
        setConfirmPassword(event.target.value);
    },[]);

    const clientEditProfileSubmitHandler = useCallback(event => {
        event.preventDefault();
        if(password !== confirmPassword){
            setMessage("ERROR WITH PASSWORDS NOT MATCHING");
        }else {
            dispatch(editUserInfoAction(username, password, "client"));
            history.push("/clientHome");
        }
    },[dispatch, history, username, password, confirmPassword]);
    
    if(isLoading){
        return <LoadingSpinner isLoading={isLoading}/>;
    }

    return (
        <div className={styles.clientProfilePageContainer}>
            <Text headerText={true}>Profile Page</Text>
            <Text>{errorMessage ? errorMessage : message}</Text>
            <form className={styles.clientEditProfileForm} onSubmit={clientEditProfileSubmitHandler}>
            <Input
                name="username"
                title="Edit Username Here"
                type="text"
                value={currentUsername}
                onChangeHandler={currentUserNameOnChangeHandler}
                placeholder="Edit Username Here"
            />
            <Input
                name="newPassword"
                title="Edit New Password Here"
                type="password"
                value={password}
                onChangeHandler={passwordOnChangeHandler}
                placeholder="Enter New Password Here"
            />
            <Input
                name="confirmNewPassword"
                title="Confirm New Password Here"
                type="password"
                value={confirmPassword}
                onChangeHandler={confirmPasswordOnChangeHandler}
                placeholder="Confirm New Password Here"
            />
            <Button title="Edit Profile" type="submit"/>
            </form>
        </div>
    )
};

export default ClientProfilePage;