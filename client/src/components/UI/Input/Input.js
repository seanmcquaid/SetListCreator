import React from "react";
import styles from "./Input.module.css";
import Container from "../Container/Container";
import PropTypes from "prop-types";

const Input = props => {
    return(
        <Container centered={true} additionalStyles={{"margin" : "0.5rem 0"}}>
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

Input.propTypes = {
    name : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    type : PropTypes.string.isRequired,
    value : PropTypes.string.isRequired,
    onChangeHandler : PropTypes.func.isRequired,
    placeholder : PropTypes.string.isRequired
};

export default Input;