import React, {useState, useEffect} from "pages/BandleaderPages/BandleaderProfilePage/node_modules/react";
import styles from "./BandLeaderProfilePage.module.css";
import Text from "pages/BandleaderPages/BandleaderProfilePage/node_modules/components/Text/Text";
import Input from "pages/BandleaderPages/BandleaderProfilePage/node_modules/components/Input/Input";
import Button from "pages/BandleaderPages/BandleaderProfilePage/node_modules/components/Button/Button";
import {connect} from "pages/BandleaderPages/BandleaderProfilePage/node_modules/react-redux";
import {editUserInfoAction, getUserInfoAction} from "pages/BandleaderPages/BandleaderProfilePage/node_modules/actions/authActions/authActions";

const BandleaderProfilePage = props => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const {editUserInfoAction, getUserInfoAction} = props;

    useEffect(() => {
        if(username === ""){
            setUsername(props.username);
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

    const bandleaderEditProfileSubmitHandler = async event => {
        event.preventDefault();
        if(password !== confirmPassword){
            setMessage("ERROR WITH PASSWORDS NOT MATCHING");
        }else {
            editUserInfoAction(username, password, "bandleader");
        }
    }

    return (
        <div className={styles.bandleaderProfilePageContainer}>
            <Text headerText={true}>Profile Page</Text>
            <Text>{props.errorMessage ? props.errorMessage : message}</Text>
            <form className={styles.bandleaderEditProfileForm} onSubmit={bandleaderEditProfileSubmitHandler}>
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

export default connect(mapStateToProps, mapDispatchToProps)(BandleaderProfilePage);