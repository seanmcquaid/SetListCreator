import React from "react";
import Container from "../../UI/Container/Container";
import Text from "../../UI/Text/Text";
import {Link} from "react-router-dom";

const BandLeaderLoginPage = props => {
    return(
        <Container centered={true}>
            <Text headerText={true}>Band Leader Login</Text>
            <Text>Don't have an account? Login <Link to="/bandLeaderRegister">Here</Link></Text>
        </Container>
    )
};

export default BandLeaderLoginPage;