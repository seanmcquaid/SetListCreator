import React from "react";
import Container from "../../UI/Container/Container";
import Text from "../../UI/Text/Text";
import LinkButton from "../../UI/LinkButton/LinkButton";

const BandLeaderHomePage = props => {
    return(
        <Container centered={true}>
            <Text headerText={true}>Band Leader Home Page</Text>
            <Container centered={true}>
                <LinkButton route="/bandLeader/setListCreator">Set List Creator</LinkButton>
                <LinkButton route="/bandLeader/clientList">Client List</LinkButton>
                <LinkButton route="/bandLeader/emailBand">Email Band</LinkButton>
            </Container>
        </Container>
    )
};

export default BandLeaderHomePage;