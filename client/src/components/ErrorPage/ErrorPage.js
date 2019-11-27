import React from "react";
import Text from "../UI/Text/Text";

const ErrorPage = props => {
    return(
        <div>
            <Text headerText={true}>Page Not Found</Text>
            <Text>So sorry, your requested page either is down currently or is no longer available!</Text>
        </div>
    )
};

export default ErrorPage;