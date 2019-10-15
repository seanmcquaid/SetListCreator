import React from "react";
import Container from "../UI/Container/Container";
import Text from "../UI/Text/Text";

const ErrorPage = props => {
    return(
        <Container centered={true}>
            <Text headerText={true}>Page Not Found</Text>
            <Text>So sorry, your requested page either is down currently or is no longer available!</Text>
        </Container>
    )
};

export default ErrorPage;