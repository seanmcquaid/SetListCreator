import React from "react";
import Text from "../UI/Text/Text";
import LinkButton from "../UI/LinkButton/LinkButton";

const LandingPage = props => {
    return (
        <div>
            <div>
                <Text headerText={true}>Set List Creator</Text>
                <Text>Are you a Client or a Bandleader?</Text>
            </div>
            <div>
                <LinkButton route="/clientLogin">Client</LinkButton>
                <LinkButton route="/bandLeaderLogin">Bandleader</LinkButton>
            </div>
        </div>
    )
};

export default LandingPage;