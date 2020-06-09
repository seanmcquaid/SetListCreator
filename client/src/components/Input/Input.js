import React from "react";
import styles from "./Input.module.css";
import PropTypes from "prop-types";

const Input = React.memo(({
    name, 
    title, 
    type, 
    value, 
    onChangeHandler, 
    placeholder
}) => {
    return(
        <div className={styles.inputContainer}>
            <label htmlFor={name} className={styles.inputLabel}>{title}</label>
            <input
                className={styles.input}
                name={name}
                type={type}
                value={value}
                onChange={onChangeHandler}
                placeholder={placeholder}
            />
        </div>
    )
});

Input.propTypes = {
    name : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    type : PropTypes.string.isRequired,
    value : PropTypes.string.isRequired,
    onChangeHandler : PropTypes.func.isRequired,
    placeholder : PropTypes.string.isRequired
};

Input.defaultProps = {
    name : "Input Name",
    title : "Input Title",
    type : "Input Type",
    value : "Input Value",
    onChangeHandler : () => console.log("On Change Handler"),
    placeholder : "Input Placeholder"
};

export default Input;