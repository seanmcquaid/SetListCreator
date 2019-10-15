import React from "react";
import styles from "./LandingPage.module.css";
import Text from "../UI/Text/Text";
import Container from "../UI/Container/Container";
import LinkButton from "../UI/LinkButton/LinkButton";

const LandingPage = props => {
    return (
        <Container centered={true}>
            <Container centered={true}>
                <Text headerText={true}>Set List Generator</Text>
                <Text>Are you a Client or a Bandleader?</Text>
            </Container>
            <Container centered={true} additionalStyles={{"flex-direction" : "row"}}>
                <LinkButton route="/clientLogin">Client</LinkButton>
                <LinkButton route="/bandLeaderLogin">Bandleader</LinkButton>
            </Container>
        </Container>
    )
};

export default LandingPage;