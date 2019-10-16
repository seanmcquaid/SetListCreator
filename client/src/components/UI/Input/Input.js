import React from "react";
import styles from "./Input.module.css";

const Input = props => {
    return(
        <div className={styles.formInputContainer}>
            <label htmlFor={props.name} className={styles.formLabel}>{props.title}</label>
            <input
            className={styles.formInput}
                name={props.name}
                type={props.type}
                value={props.value}
                onChange={props.onChangeHandler}
                placeholder={props.placeholder}
            />
        </div>
    )
};

export default Input;