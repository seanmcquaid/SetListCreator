import React from "react";
import Text from "../UI/Text/Text";
import LinkButton from "../UI/LinkButton/LinkButton";
import styles from "./LandingPage.module.css";

const LandingPage = props => {
    return (
        <div className={styles.landingPageContainer}>
            <div className={styles.textContainer}>
                <Text headerText={true}>Set List Creator</Text>
                <Text>Are you a Client or a Bandleader?</Text>
            </div>
            <div className={styles.buttonContainer}>
                <LinkButton route="/clientLogin">Client</LinkButton>
                <LinkButton route="/bandLeaderLogin">Bandleader</LinkButton>
            </div>
        </div>
    )
};

export default LandingPage;