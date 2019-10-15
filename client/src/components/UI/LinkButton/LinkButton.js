import React from "react";
import {Link} from "react-router-dom";
import styles from "./LinkButton.module.css"; 
import Text from "../Text/Text";

const LinkButton = props => {
    return(
        <Link className={styles.linkButton} to={props.route}>
            <Text>{props.children}</Text>
        </Link>
    )
};

export default LinkButton;