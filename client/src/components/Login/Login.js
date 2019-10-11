import React, {useState} from "react";
import {useDispatch} from "react-redux";

const Login = props => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const userNameChangeHandler = text => {
        setUserName(text);
    };

    const passwordChangeHandler = text => {
        setPassword(text);
    };

    return(
        <div>
            LOGIN HERE
        </div>
    )
};

export default Login;