import React from "react";
import {Link} from "react-router-dom";
import styles from "./LinkButton.module.css"; 
import PropTypes from "prop-types";

const LinkButton = props => {
    return(
        <Link className={styles.linkButton} to={props.route}>
            {props.children}
        </Link>
    )
};

LinkButton.propTypes = {
    route : PropTypes.string.isRequired
};

export default LinkButton;