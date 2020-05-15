import React from "react";
import styles from "./Text.module.css";
import PropTypes from "prop-types";

const Text = ({headerText, children}) => (
    headerText ? 
        <h1 className={styles.headerText}>{children}</h1> :
        <p className={styles.normalText}>{children}</p>
)

Text.propTypes = {
    headerText : PropTypes.bool,
    children : PropTypes.any.isRequired,
};

Text.defaultProps = {
    headerText : false,
    children : "Text Here"
}

export default Text;