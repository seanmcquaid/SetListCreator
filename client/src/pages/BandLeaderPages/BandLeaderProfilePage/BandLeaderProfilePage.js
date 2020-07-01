import React, {useState, useEffect, useCallback, useRef} from "react";
import styles from "./BandleaderProfilePage.module.css";
import Text from "components/Text/Text";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import {useSelector, useDispatch} from "react-redux";
import {editUserInfoAction, getUserInfoAction} from "actions/authActions/authActions";
import { selectAuthState } from "selectors/authSelectors/authSelectors";
import { selectErrorState } from "selectors/errorSelectors/errorSelectors";
import { useHistory } from "react-router-dom";

const BandleaderProfilePage = () => {
    const {username, isLoading} = useSelector(selectAuthState);
    const {errorMessage} = useSelector(selectErrorState);

    const isMounted = useRef(true);

    const dispatch = useDispatch();
    const history = useHistory();

    const [currentUsername, setCurrentUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if(isMounted.current){
            dispatch(getUserInfoAction());
        }

        if(currentUsername === ""){
            setCurrentUsername(username);
        }

        return () => {
            isMounted.current = false;
        };
    },[username, isLoading, currentUsername, dispatch])

    const currentUsernameOnChangeHandler = useCallback(event => {
        setCurrentUsername(event.target.value);
    },[]);

    const passwordOnChangeHandler = useCallback(event => {
        setPassword(event.target.value);
    },[]);

    const confirmPasswordOnChangeHandler = useCallback(event => {
        setConfirmPassword(event.target.value);
    },[]);

    const bandleaderEditProfileSubmitHandler = useCallback(event => {
        event.preventDefault();
        if(password !== confirmPassword){
            setMessage("ERROR WITH PASSWORDS NOT MATCHING");
        }else {
            dispatch(editUserInfoAction(currentUsername, password, "bandleader"));
            history.push("/bandleaderHome");
        }
    },[currentUsername, password, history, dispatch, confirmPassword]);

    if(isLoading){
        return <LoadingSpinner isLoading={isLoading}/>;
    }

    return (
        <div className={styles.bandleaderProfilePageContainer}>
            <Text headerText={true}>Profile Page</Text>
            <Text>{errorMessage ? errorMessage : message}</Text>
            <form className={styles.bandleaderEditProfileForm} onSubmit={bandleaderEditProfileSubmitHandler}>
                <Input
                    name="username"
                    title="Edit Username Here"
                    type="text"
                    value={currentUsername}
                    onChangeHandler={currentUsernameOnChangeHandler}
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

export default BandleaderProfilePage;