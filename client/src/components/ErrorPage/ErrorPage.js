import React from "react";
import Text from "../UI/Text/Text";
import styles from "./ErrorPage.module.css";

const ErrorPage = props => {
    return(
        <div className={styles.errorPageContainer}>
            <Text headerText={true}>Page Not Found</Text>
            <Text>So sorry, your requested page either is down currently or is no longer available!</Text>
        </div>
    )
};

export default ErrorPage;