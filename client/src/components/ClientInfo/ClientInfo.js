import React from "react";
import Text from "components/Text/Text";
import Button from "components/Button/Button";
import styles from "./ClientInfo.module.css";

const ClientInfo = props => {
    return(
        <div className={styles.clientInfoContainer}>
            <h4 className={styles.clientName}>{props.clientName}</h4>
            <Text>Set List Status :  
                {console.log(props.clientApproved === null && props.setListAvailable )}
                {props.clientApproved && props.setListAvailable ? " Complete" : 
                props.clientApproved === null && props.setListAvailable ? " Ready" : " Needs Edits"}
            </Text>
            {props.clientApproved && props.setListAvailable ?
                <Button 
                    title="Go To Final Set List Page"
                    type="button"
                    onClick={props.clientFinalSetListPageRedirect}
                /> : 
                props.clientApproved === null && props.setListAvailable ? 
                <Button
                    title="Go To Set List Page"
                    type="button"
                    onClick={props.clientCreateSetListPageRedirect}
                /> :
                <Button 
                    title="Go To Edit Set List Page"
                    type="button"
                    onClick={props.clientEditSetListPageRedirect}
                />
            }
        </div>
    )
};

export default ClientInfo;