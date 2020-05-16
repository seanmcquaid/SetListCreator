import React, {useState, useEffect} from "react";
import styles from "./BandleaderProfilePage.module.css";
import Text from "components/Text/Text";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import {useSelector, useDispatch} from "react-redux";
import {editUserInfoAction, getUserInfoAction} from "actions/authActions/authActions";
import { selectAuthState } from "selectors/authSelectors";
import { selectErrorState } from "selectors/errorReducer";
import { useHistory } from "react-router-dom";

const BandleaderProfilePage = () => {
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
    },[username, isLoading, currentUsername, dispatch])

    const currentUsernameOnChangeHandler = event => {
        setCurrentUsername(event.target.value);
    };

    const passwordOnChangeHandler = event => {
        setPassword(event.target.value);
    };

    const confirmPasswordOnChangeHandler = event => {
        setConfirmPassword(event.target.value);
    };

    const bandleaderEditProfileSubmitHandler = event => {
        event.preventDefault();
        if(password !== confirmPassword){
            setMessage("ERROR WITH PASSWORDS NOT MATCHING");
        }else {
            dispatch(editUserInfoAction(currentUsername, password, "bandleader"));
            history.push("/bandleaderHome")
        }
    }

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