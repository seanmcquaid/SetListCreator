import React, {useState, useEffect} from "react";
import styles from "./BandLeaderProfilePage.module.css";
import Text from "components/Text/Text";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import {connect} from "react-redux";
import { tokenConfig } from "actions/authActions/authActions";
import axios from "axios";
import {editUserInfoAction} from "actions/authActions/authActions";
import {apiHost} from "config";

const BandLeaderProfilePage = props => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const {editUserInfoAction} = props;

    useEffect(() => {
        const headers = tokenConfig();
        axios.get(`${apiHost}/users/getUserInfo`, headers)
            .then(response => {
                const userInfo = response.data.userInfo[0].username;
                setUsername(userInfo);
            })
            .catch(err => console.log(err));
    },[])

    const userNameOnChangeHandler = event => {
        setUsername(event.target.value);
    }

    const passwordOnChangeHandler = event => {
        setPassword(event.target.value);
    }

    const confirmPasswordOnChangeHandler = event => {
        setConfirmPassword(event.target.value);
    }

    const bandLeaderEditProfileSubmitHandler = async event => {
        event.preventDefault();
        if(password !== confirmPassword){
            setErrorMessage("ERROR WITH PASSWORDS NOT MATCHING");
        }else {
            editUserInfoAction(username, password, "bandLeader");
        }
    }

    return (
        <div className={styles.bandLeaderProfilePageContainer}>
            <Text headerText={true}>Profile Page</Text>
            <Text>{errorMessage}</Text>
            <form className={styles.bandLeaderEditProfileForm} onSubmit={bandLeaderEditProfileSubmitHandler}>
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

});

const mapDispatchToProps = dispatch => ({
    editUserInfoAction : (newUsername, newPassword, accountType) => dispatch(editUserInfoAction(newUsername, newPassword, accountType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BandLeaderProfilePage);