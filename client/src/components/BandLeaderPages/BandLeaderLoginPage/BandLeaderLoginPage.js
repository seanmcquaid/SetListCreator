import React, {useState} from "react";
import Container from "../../UI/Container/Container";
import Text from "../../UI/Text/Text";
import {Link, Redirect} from "react-router-dom";
import styles from "./BandLeaderLoginPage.module.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import {useSelector, useDispatch} from "react-redux";
import { loginAction } from "../../../actions/authActions/authActions";


const BandLeaderLoginPage = props => {
    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] =  useState("");
    
    const usernameOnChangeHandler = event => {
        setUsername(event.target.value);
    };

    const passwordChangeHandler = event => {
        setPassword(event.target.value);
    };

    const bandLeaderLoginSubmitHandler = event => {
        event.preventDefault();
        dispatch(loginAction(username, password));
    };
    
    if(authState.isAuthenticated){
        return <Redirect to="/bandLeaderHome"/>
    }


    return(
        <Container centered={true}>
            <Text headerText={true}>Band Leader Login</Text>
            {authState.errorData.errorMessage && !authState.isAuthenticated ? 
                <Text>{authState.errorData.errorMessage}</Text> : 
                <Text>
                    Don't have an account? Register <Link className={styles.registerLink} to="/bandLeaderRegister">Here</Link>
                </Text>
            }
            <form onSubmit={bandLeaderLoginSubmitHandler}>
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
        </Container>
    )
};

export default BandLeaderLoginPage;