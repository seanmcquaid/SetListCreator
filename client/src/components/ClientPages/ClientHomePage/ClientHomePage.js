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
                    Play List
                </div>
                <div>
                    Do Not List
                </div>
            </div>
        </Container>
    )
};

export default ClientHomePage;