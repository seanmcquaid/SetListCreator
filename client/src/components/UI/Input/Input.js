import React from "react";
import styles from "./Input.module.css";
import PropTypes from "prop-types";

const Input = props => {
    return(
        <div className={styles.inputContainer}>
            <label htmlFor={props.name} className={styles.inputLabel}>{props.title}</label>
            <input
            className={styles.input}
                name={props.name}
                type={props.type}
                value={props.value}
                onChange={props.onChangeHandler}
                placeholder={props.placeholder}
            />
        </div>
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