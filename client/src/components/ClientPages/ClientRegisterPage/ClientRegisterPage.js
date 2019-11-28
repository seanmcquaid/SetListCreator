import React, {useState} from "react";
import Text from "../../UI/Text/Text";
import {Link} from "react-router-dom";
import styles from "./ClientRegisterPage.module.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import {useSelector, useDispatch} from "react-redux";
import {registerAction} from "../../../actions/authActions/authActions";

const ClientRegisterPage = props => {
    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] =  useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const usernameOnChangeHandler = event => {
        setUsername(event.target.value);
    };

    const passwordChangeHandler = event => {
        setPassword(event.target.value);
    };

    const confirmPasswordChangeHandler = event => {
        setConfirmPassword(event.target.value);
    };

    const clientRegisterSubmitHandler = event => {
        event.preventDefault();
        dispatch(registerAction(username, password, confirmPassword, "client"));
    };

    return(
        <div className={styles.clientRegisterContainer}>
            <div className={styles.textContainer}>
                <Text headerText={true}>Client Register</Text>
                {authState.errorData.errorMessage && !authState.isAuthenticated ? 
                    <Text>{authState.errorData.errorMessage}</Text> : 
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
                <Button title="Register" type="submit"/>
            </form>
        </div>
    )
};

// add map state and map dispatch

export default ClientRegisterPage;