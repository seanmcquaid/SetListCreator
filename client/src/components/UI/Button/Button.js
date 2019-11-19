import React from "react";
import styles from "./Button.module.css";
import PropTypes from "prop-types";

const Button = props => {
    return(
        <button className={styles.button} type={props.type} onClick={props.onClick}>
            {props.title}
        </button>
    )
};

Button.propTypes = {
    type : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    onClick : PropTypes.func,
};

export default Button;