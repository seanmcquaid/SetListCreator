import React, {useState} from "react";
import Text from "components/Text/Text";
import {Link, Redirect} from "react-router-dom";
import styles from "./BandleaderRegisterPage.module.css";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import {connect} from "react-redux";
import {registerAction} from "actions/authActions/authActions";

const BandleaderRegisterPage = props => {

    const [username, setUsername] = useState("");
    const [password, setPassword] =  useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const {registerAction} = props;
    
    const usernameOnChangeHandler = event => {
        setUsername(event.target.value);
    };

    const passwordChangeHandler = event => {
        setPassword(event.target.value);
    };

    const confirmPasswordChangeHandler = event => {
        setConfirmPassword(event.target.value);
    };

    const bandleaderRegisterSubmitHandler = event => {
        event.preventDefault();
        if(password !== confirmPassword){
            setErrorMessage("Passwords don't match");
        }else {
            registerAction(username, password, "bandleader");
        }
    };

    if(props.isAuthenticated){
        return <Redirect to="/bandleaderHome"/>
    }

    return(
        <div className={styles.bandLeaderRegisterContainer}>
            <div className={styles.textContainer}>
                <Text headerText={true}>Band Leader Register</Text>
                <Text>
                    Already have an account? Login <Link className={styles.registerLink} to="/bandleaderLogin">Here</Link>
                </Text>
                <Text>{props.errorMessage ? props.errorMessage : errorMessage}</Text>
            </div>
            <form className={styles.registerForm} onSubmit={bandleaderRegisterSubmitHandler}>
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
                <Button title="Register" type="submit"/>
            </form>
        </div>
    )
};

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
    errorMessage : state.error.errorMessage,
});

const mapDispatchToProps = dispatch => ({
    registerAction : (username, password, confirmPassword, accountType) => dispatch(registerAction(username, password, confirmPassword, accountType))
});

export default connect(mapStateToProps, mapDispatchToProps)(BandleaderRegisterPage);