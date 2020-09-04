import React, { useState, useCallback } from "react";
import Text from "components/Text/Text";
import { Link, Redirect } from "react-router-dom";
import styles from "./BandleaderLoginPage.module.css";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "actions/authActions/authActions";
import { selectAuthState } from "selectors/authSelectors/authSelectors";
import { selectErrorState } from "selectors/errorSelectors/errorSelectors";

const BandleaderLoginPage = () => {
  const { isAuthenticated } = useSelector(selectAuthState);
  const { errorMessage } = useSelector(selectErrorState);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameOnChangeHandler = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  const passwordChangeHandler = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  const bandleaderLoginSubmitHandler = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(loginAction(username, password, "bandleader"));
    },
    [dispatch, username, password]
  );

  if (isAuthenticated) {
    return <Redirect to="/bandleaderHome" />;
  }

  return (
    <div className={styles.bandleaderLoginContainer}>
      <div className={styles.textContainer}>
        <Text headerText={true}>Band Leader Login</Text>
        <Text>
          Don't have an account? Register{" "}
          <Link className={styles.registerLink} to="/bandleaderRegister">
            Here
          </Link>
        </Text>
        <Text>{errorMessage}</Text>
      </div>
      <form
        className={styles.loginForm}
        onSubmit={bandleaderLoginSubmitHandler}
      >
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
        <Button title="Login" type="submit" />
      </form>
    </div>
  );
};

export default BandleaderLoginPage;
