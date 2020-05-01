import React from "react";
import Text from "components/Text/Text";
import Button from "components/Button/Button";
import styles from "./ClientInfo.module.css";

const ClientInfo = props => {
    return(
        <div className={styles.clientInfoContainer}>
            <h4 className={styles.clientName}>{props.clientName}</h4>
            <Text>Set List Status : {props.setListAvailable ? "Ready" : "In Progress"}</Text>
            {props.clientApproved ? 
                <Button 
                    title="Go To Final Setlist Page"
                    type="button"
                    onClick={props.clientFinalSetlistPageRedirect}
                /> : 
                <Button
                    title="Go To Setlist Page"
                    type="button"
                    onClick={props.clientPageRedirect}
                />
            }
        </div>
    )
};

export default ClientInfo;