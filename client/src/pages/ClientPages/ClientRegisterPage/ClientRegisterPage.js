import React, {useState, useEffect} from "react";
import Text from "components/Text/Text";
import {Link} from "react-router-dom";
import styles from "./ClientRegisterPage.module.css";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import {connect} from "react-redux";
import {registerAction} from "actions/authActions/authActions";
import axios from "axios";
import Dropdown from "components/Dropdown/Dropdown";

const ClientRegisterPage = props => {
    const {registerAction} = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] =  useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [bandleaders, setBandleaders] = useState([""]);
    const [selectedBandleader, setSelectedBandleader] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        axios.get(`${window.apiHost}/users/getBandleaders`)
            .then(async response => {
                const bandLeadersArray = response.data.bandLeaders.map(bandLeader => (bandLeader.username));
                let initialArray = [""];
                const newArray = initialArray.concat(bandLeadersArray);
                await setBandleaders(newArray);
            })
            .catch(err => console.log(err));
    },[])
    
    const usernameOnChangeHandler = event => {
        setUsername(event.target.value);
    };

    const passwordChangeHandler = event => {
        setPassword(event.target.value);
    };

    const confirmPasswordChangeHandler = event => {
        setConfirmPassword(event.target.value);
    };

    const selectedBandleaderOnChangeHandler = event => {
        setSelectedBandleader(event.target.value);
    }

    const clientRegisterSubmitHandler = event => {
        event.preventDefault();
        if(password !== confirmPassword){
            setErrorMessage("Passwords don't match");
        } else if(selectedBandleader === "") {
            setErrorMessage("SELECT A BANDLEADER");
        } else {
            registerAction(username, password, "client", selectedBandleader);
        }
    };

    return(
        <div className={styles.clientRegisterContainer}>
            <div className={styles.textContainer}>
                <Text headerText={true}>Client Register</Text>
                {props.auth.errorData.errorMessage && !props.auth.isAuthenticated ? 
                    <Text>{props.auth.errorData.errorMessage}</Text> : 
                    <Text>
                        Already have an account? Login <Link className={styles.registerLink} to="/clientLogin">Here</Link>
                    </Text>
                }
            </div>
            <form className={styles.registerForm} onSubmit={clientRegisterSubmitHandler}>
                <Input 
                    name="username"
                    title="Username"
                    type="text"
                    value={username}
                    onChangeHandler={usernameOnChangeHandler}
                    placeholder="Enter your username here"
                />
                <Input 
                    name="password"
                    title="Password"
                    type="password"
                    value={password}
                    onChangeHandler={passwordChangeHandler}
                    placeholder="Enter your password here"
                />
                <Input 
                    name="confirmPassword"
                    title="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChangeHandler={confirmPasswordChangeHandler}
                    placeholder="Enter your password again here"
                />
                <Dropdown
                    selectedItem={selectedBandleader}
                    name="selectedBandleader"
                    title="Select Your Bandleader"
                    selectedItemOnChangeHandler={selectedBandleaderOnChangeHandler}
                    items={bandleaders}
                />
                <Button title="Register" type="submit"/>
            </form>
        </div>
    )
};

const mapStateToProps = state => ({
    auth : state.auth
});

const mapDispatchToProps = dispatch => ({
    registerAction : (username, password, confirmPassword, accountType) => dispatch(registerAction(username, password, confirmPassword, accountType))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientRegisterPage);