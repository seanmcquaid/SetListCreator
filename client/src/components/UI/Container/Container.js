import React from "react";
import styles from "./Container.module.css";
import PropTypes from "prop-types";

const Container = props => {
    const className = props.centered ? styles.centeredContainer : props.right ? styles.rightContainer : styles.leftContainer;
    return(
        <div className={className} style={props.additionalStyles}>
            {props.children}
        </div>
    )
};

Container.propTypes = {
    centered : PropTypes.bool.isRequired,
    additionalStyles : PropTypes.object
}

export default Container;