import React, {useState, useCallback} from "react";
import Text from "components/Text/Text";
import {Link, Redirect} from "react-router-dom";
import styles from "./ClientLoginPage.module.css";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import {useSelector, useDispatch} from "react-redux";
import { loginAction } from "actions/authActions/authActions";
import { selectAuthState } from "selectors/authSelectors";
import { selectErrorState } from "selectors/errorReducer";


const ClientLoginPage = () => {
    const {isAuthenticated} = useSelector(selectAuthState);
    const {errorMessage} = useSelector(selectErrorState);
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] =  useState("");
    
    const usernameOnChangeHandler = useCallback(event => {
        setUsername(event.target.value);
    },[]);

    const passwordChangeHandler = useCallback(event => {
        setPassword(event.target.value);
    },[]);

    const clientLoginSubmitHandler = useCallback(event => {
        event.preventDefault();
        dispatch(loginAction(username, password, "client"));
    },[dispatch, username, password]);

    if(isAuthenticated){
        return <Redirect to="/clientHome"/>
    }


    return(
        <div className={styles.clientLoginContainer}>
            <div className={styles.textContainer}>
                <Text headerText={true}>Client Login</Text> 
                <Text>
                    Don't have an account? Register <Link className={styles.registerLink} to="/clientRegister">Here</Link>
                </Text>
                <Text>{errorMessage}</Text>
            </div>
            <form className={styles.loginForm} onSubmit={clientLoginSubmitHandler}>
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
                <Button title="Login" type="submit"/>
            </form>
        </div>
    )
};

export default ClientLoginPage;