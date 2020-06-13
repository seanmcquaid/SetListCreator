import React from "react";
import styles from "./Text.module.css";
import PropTypes from "prop-types";

const Text = React.memo(({headerText, children}) => (
    headerText ? 
        <h1 className={styles.headerText} data-testid="headerText">{children}</h1> :
        <p className={styles.normalText} data-testid="paragraphText">{children}</p>
));

Text.propTypes = {
    headerText : PropTypes.bool,
    children : PropTypes.any.isRequired,
};

export default Text;