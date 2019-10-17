import React from "react";
import styles from "./Input.module.css";
import Container from "../Container/Container";

const Input = props => {
    return(
        <Container centered={true}>
            <label htmlFor={props.name} className={styles.inputLabel}>{props.title}</label>
            <input
            className={styles.input}
                name={props.name}
                type={props.type}
                value={props.value}
                onChange={props.onChangeHandler}
                placeholder={props.placeholder}
            />
        </Container>
    )
};

export default Input;