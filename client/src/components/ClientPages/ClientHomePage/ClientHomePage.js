import React from "react";
import Container from "../../UI/Container/Container";
import Text from "../../UI/Text/Text";
import LinkButton from "../../UI/LinkButton/LinkButton";

const ClientHomePage = props => {
    return(
        <Container centered={true}>
            <Text headerText={true}>Musical Preferences Page</Text>
            {/* lists here with accompanying form */}
            <div>
                <div>
                    <Text>Requested Songs</Text>
                    <form></form>
                    <div></div>
                    Play List with form
                </div>
                <div>
                    <Text>DO NOT play list</Text>
                    <form></form>
                    <div></div>
                    Do Not List with form
                </div>
            </div>
        </Container>
    )
};

export default ClientHomePage;