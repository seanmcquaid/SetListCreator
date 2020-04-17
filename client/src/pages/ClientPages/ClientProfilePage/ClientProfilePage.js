import React, {useState, useEffect} from "react";
import styles from "./ClientProfilePage.module.css";
import Text from "components/Text/Text";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import {connect} from "react-redux";
import {editUserInfoAction, getUserInfoAction} from "actions/authActions/authActions";

const ClientProfilePage = props => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const {editUserInfoAction, getUserInfoAction} = props;

    useEffect(() => {
        if(username === ""){
            setUsername(props.username);
            setSuccessMessage("Loaded username!")
        }
        getUserInfoAction();
    },[getUserInfoAction, username, props.username])

    const userNameOnChangeHandler = event => {
        setUsername(event.target.value);
    }

    const passwordOnChangeHandler = event => {
        setPassword(event.target.value);
    }

    const confirmPasswordOnChangeHandler = event => {
        setConfirmPassword(event.target.value);
    }

    const clientEditProfileSubmitHandler = async event => {
        event.preventDefault();
        if(password !== confirmPassword){
            setErrorMessage("ERROR WITH PASSWORDS NOT MATCHING");
        }else {
            editUserInfoAction(username, password, "client");
        }
    }

    return (
        <div className={styles.clientProfilePageContainer}>
            <Text headerText={true}>Profile Page</Text>
            <Text>{props.errorMessage ? props.errorMessage : successMessage}</Text>
            <form className={styles.clientEditProfileForm} onSubmit={clientEditProfileSubmitHandler}>
            <Input
                name="username"
                title="Edit Username Here"
                type="text"
                value={username}
                onChangeHandler={userNameOnChangeHandler}
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

const mapStateToProps = state => ({
    errorMessage : state.error.errorMessage,
    username : state.auth.username,
});

const mapDispatchToProps = dispatch => ({
    editUserInfoAction : (newUsername, newPassword, accountType) => dispatch(editUserInfoAction(newUsername, newPassword, accountType)),
    getUserInfoAction : () => dispatch(getUserInfoAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientProfilePage);