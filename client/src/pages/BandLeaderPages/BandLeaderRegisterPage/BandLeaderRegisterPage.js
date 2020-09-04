import React, { useState, useCallback } from "react";
import Text from "components/Text/Text";
import { Link, Redirect } from "react-router-dom";
import styles from "./BandleaderRegisterPage.module.css";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { registerAction } from "actions/authActions/authActions";
import { selectAuthState } from "selectors/authSelectors/authSelectors";
import { selectErrorState } from "selectors/errorSelectors/errorSelectors";

const BandleaderRegisterPage = () => {
  const { isAuthenticated } = useSelector(selectAuthState);
  const { errorMessage } = useSelector(selectErrorState);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newErrorMessage, setNewErrorMessage] = useState("");

  const usernameOnChangeHandler = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  const passwordChangeHandler = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  const confirmPasswordChangeHandler = useCallback((event) => {
    setConfirmPassword(event.target.value);
  }, []);

  const bandleaderRegisterSubmitHandler = useCallback(
    (event) => {
      event.preventDefault();
      if (password !== confirmPassword) {
        setNewErrorMessage("Passwords don't match");
      } else {
        dispatch(registerAction(username, password, "bandleader"));
      }
    },
    [dispatch, confirmPassword, username, password]
  );

  if (isAuthenticated) {
    return <Redirect to="/bandleaderHome" />;
  }

  return (
    <div className={styles.bandLeaderRegisterContainer}>
      <div className={styles.textContainer}>
        <Text headerText={true}>Band Leader Register</Text>
        <Text>
          Already have an account? Login{" "}
          <Link className={styles.registerLink} to="/bandleaderLogin">
            Here
          </Link>
        </Text>
        <Text>{errorMessage ? errorMessage : newErrorMessage}</Text>
      </div>
      <form
        className={styles.registerForm}
        onSubmit={bandleaderRegisterSubmitHandler}
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
        <Input
          name="confirmPassword"
          title="Confirm Password"
          type="password"
          value={confirmPassword}
          onChangeHandler={confirmPasswordChangeHandler}
          placeholder="Enter your password again here"
        />
        <Button title="Register" type="submit" />
      </form>
    </div>
  );
};

export default BandleaderRegisterPage;
