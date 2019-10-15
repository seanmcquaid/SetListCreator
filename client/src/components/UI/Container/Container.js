import React from "react";
import styles from "./Container.module.css";

const Container = props => {
    const className = props.centered ? styles.centeredContainer : props.right ? styles.rightContainer : styles.leftContainer;
    return(
        <div className={className} style={props.additionalStyles}>
            {props.children}
        </div>
    )
}

export default Container;