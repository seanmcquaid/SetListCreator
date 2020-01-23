import React from "react";
import Text from "components/Text/Text";
import Button from "components/Button/Button";

const ClientInfo = props => {
    return(
        <div>
            <h4>{props.clientName}</h4>
            <Text>Set List Status : {props.setListAvailable ? "Ready" : "In Progress"}</Text>
            <Button
                title="Go To Setlist Page"
                type="button"
                onClick={props.clientPageRedirect}
            />
        </div>
    )
};

export default ClientInfo;