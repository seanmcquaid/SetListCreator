import React from "react";
import styles from "./LandingPage.module.css";
import Text from "../UI/Text/Text";

const LandingPage = props => {
    return (
        <div className={styles.landingPageContainer}>
            <div className={styles.textContainer}>
                <Text>Set List Generator</Text>
                <Text></Text>
            </div>
        </div>
    )
}

export default LandingPage;