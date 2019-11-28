import React, {useState} from "react";
import Text from "../../UI/Text/Text";
import {Link} from "react-router-dom";
import styles from "./BandLeaderRegisterPage.module.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import {connect} from "react-redux";
import {registerAction} from "../../../actions/authActions/authActions";

const BandLeaderRegisterPage = props => {

    const [username, setUsername] = useState("");
    const [password, setPassword] =  useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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

    const bandLeaderRegisterSubmitHandler = event => {
        event.preventDefault();
        registerAction(username, password, confirmPassword, "bandLeader");
    };

    return(
        <div className={styles.bandLeaderRegisterContainer}>
            <div className={styles.textContainer}>
                <Text headerText={true}>Band Leader Register</Text>
                {props.auth.errorData.errorMessage && !props.auth.isAuthenticated ? 
                    <Text>{props.auth.errorData.errorMessage}</Text> : 
                    <Text>
                        Already have an account? Login <Link className={styles.registerLink} to="/bandLeaderLogin">Here</Link>
                    </Text>
                }
            </div>
            <form className={styles.registerForm} onSubmit={bandLeaderRegisterSubmitHandler}>
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
    auth : state.auth,
});

const mapDispatchToProps = dispatch => ({
    registerAction : (username, password, confirmPassword, accountType) => dispatch(registerAction(username, password, confirmPassword, accountType))
});

export default connect(mapStateToProps, mapDispatchToProps)(BandLeaderRegisterPage);