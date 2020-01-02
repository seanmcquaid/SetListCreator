import React, {useState} from "react";
import Text from "components/Text/Text";
import {Link, Redirect} from "react-router-dom";
import styles from "./ClientLoginPage.module.css";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import {connect} from "react-redux";
import { loginAction } from "actions/authActions/authActions";


const ClientLoginPage = props => {
    const [username, setUsername] = useState("");
    const [password, setPassword] =  useState("");
    
    const usernameOnChangeHandler = event => {
        setUsername(event.target.value);
    };

    const passwordChangeHandler = event => {
        setPassword(event.target.value);
    };

    const clientLoginSubmitHandler = event => {
        event.preventDefault();
        props.loginAction(username, password);
    };

    if(props.auth.isAuthenticated){
        return <Redirect to="/clientHome"/>
    }


    return(
        <div className={styles.clientLoginContainer}>
            <div className={styles.textContainer}>
                <Text headerText={true}>Client Login</Text>
                {props.auth.errorData.errorMessage && !props.auth.isAuthenticated ? 
                    <Text>{props.auth.errorData.errorMessage}</Text> : 
                    <Text>
                        Don't have an account? Register <Link className={styles.registerLink} to="/clientRegister">Here</Link>
                    </Text>
                }
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

const mapStateToProps = state => ({
    auth : state.auth
})

const mapDispatchToProps = dispatch => ({
    loginAction : (username, password) => dispatch(loginAction(username, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientLoginPage);