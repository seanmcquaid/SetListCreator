import React from "react";
import Container from "../../UI/Container/Container";
import Text from "../../UI/Text/Text";
import LinkButton from "../../UI/LinkButton/LinkButton";

const ClientHomePage = props => {
    return(
        <Container centered={true}>
            <Text headerText={true}>Client Home Page</Text>
            <Container centered={true}>
                <LinkButton route="/client/songListCreator">Song List Creator</LinkButton>
                <LinkButton route="/client/contactBandleader">Email Band Leader</LinkButton>
            </Container>
        </Container>
    )
};

export default ClientHomePage;