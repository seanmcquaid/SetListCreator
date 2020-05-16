import React from "react";
import Text from "components/Text/Text";
import LinkButton from "components/LinkButton/LinkButton";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
    return (
        <div className={styles.landingPageContainer}>
            <div className={styles.textContainer}>
                <Text headerText={true}>Set List Creator</Text>
                <Text>Are you a Client or a Bandleader?</Text>
            </div>
            <div className={styles.buttonContainer}>
                <LinkButton route="/clientLogin">Client</LinkButton>
                <LinkButton route="/bandleaderLogin">Bandleader</LinkButton>
            </div>
        </div>
    )
};

export default LandingPage;