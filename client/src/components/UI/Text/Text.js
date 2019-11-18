import React from "react";
import styles from "./Text.module.css";
import PropTypes from "prop-types";

const Text = props => {

    if(props.headerText){
        return(
            <h1 className={styles.headerText}>
                {props.children}
            </h1>
        )
    }
    
    return(
        <p className={styles.normalText}>{props.children}</p>
    )
};

Text.propTypes = {
    headerText : PropTypes.bool
};

export default Text;