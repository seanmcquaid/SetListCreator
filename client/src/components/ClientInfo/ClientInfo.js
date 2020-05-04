import React from "react";
import Text from "components/Text/Text";
import Button from "components/Button/Button";
import styles from "./ClientInfo.module.css";

const ClientInfo = props => {
    return(
        <div className={styles.clientInfoContainer}>
            <h4 className={styles.clientName}>{props.clientName}</h4>
            {console.log(props)}
            <Text>Set List Status :  
                {console.log(props.clientApproved, props.setListAvailable)}
                {props.clientApproved && props.setListAvailable ? " Complete" : 
                !props.clientApproved && props.setListAvailable ? " Needs Edits" :
                props.setListAvailable ? " Ready" : " In Progress"}
            </Text>
            {props.clientApproved && props.SetListAvailable ? 
                <Button 
                    title="Go To Final Set List Page"
                    type="button"
                    onClick={props.clientFinalSetListPageRedirect}
                /> : 
                !props.clientApproved && props.setListAvailable ? 
                <Button 
                    title="Go To Edit Set List Page"
                    type="button"
                    onClick={props.clientEditSetListPageRedirect}
                />
                :
                props.setListAvailable ? 
                <Button
                    title="Go To Set List Page"
                    type="button"
                    onClick={props.clientPageRedirect}
                /> : 
                null
            }
        </div>
    )
};

export default ClientInfo;