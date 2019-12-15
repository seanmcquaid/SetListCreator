import React, {useState, useEffect} from "react";
import styles from "./BandLeaderProfilePage.module.css";
import Text from "../../UI/Text/Text";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import {connect} from "react-redux";
import { tokenConfig } from "../../../actions/authActions/authActions";
import axios from "axios";

const BandLeaderProfilePage = props => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const headers = tokenConfig();
        axios.get(`${window.apiHost}/users/getUserInfo`, headers)
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

    return (
        <div className={styles.bandLeaderProfilePageContainer}>
            <Text headerText={true}>Profile Page</Text>
            <form className={styles.bandLeaderEditProfileForm} >
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
                    type="text"
                    value={password}
                    onChangeHandler={passwordOnChangeHandler}
                    placeholder="Enter New Password Here"
                />
                <Input
                    name="confirmNewPassword"
                    title="Confirm New Password Here"
                    type="text"
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

});

export default connect(mapStateToProps, mapDispatchToProps)(BandLeaderProfilePage);