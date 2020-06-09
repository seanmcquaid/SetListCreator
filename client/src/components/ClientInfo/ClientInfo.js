import React from "react";
import Text from "components/Text/Text";
import Button from "components/Button/Button";
import styles from "./ClientInfo.module.css";
import PropTypes from "prop-types";

const ClientInfo = React.memo(({
    clientName, 
    clientApproved, 
    setListAvailable, 
    clientFinalSetListPageRedirect, 
    clientPageRedirect, 
    clientEditSetListPageRedirect
}) => {
    return(
        <div className={styles.clientInfoContainer}>
            <h4 className={styles.clientName}>{clientName}</h4>
            <Text>Set List Status :  
                {clientApproved && setListAvailable ? " Complete" : 
                clientApproved === null && setListAvailable ? " Ready" : " Needs Edits"}
            </Text>
            {clientApproved && setListAvailable ?
                <Button 
                    title="Go To Final Set List Page"
                    type="button"
                    onClick={clientFinalSetListPageRedirect}
                /> : 
                clientApproved === null && setListAvailable ? 
                <Button
                    title="Go To Set List Page"
                    type="button"
                    onClick={clientPageRedirect}
                /> :
                <Button 
                    title="Go To Edit Set List Page"
                    type="button"
                    onClick={clientEditSetListPageRedirect}
                />
            }
        </div>
    )
});

ClientInfo.propTypes = {
    clientName : PropTypes.string.isRequired, 
    clientApproved : PropTypes.bool, 
    setListAvailable : PropTypes.bool.isRequired,
    clientFinalSetListPageRedirect : PropTypes.func.isRequired, 
    clientPageRedirect : PropTypes.func.isRequired, 
    clientEditSetListPageRedirect : PropTypes.func.isRequired, 
};

ClientInfo.defaultProps = {
    clientName : "Client Name", 
    clientApproved : null, 
    setListAvailable : false, 
    clientFinalSetListPageRedirect : () => console.log("Final Set List Redirect"), 
    clientPageRedirect : () => console.log("Client Page Redirect"),
    clientEditSetListPageRedirect : () => console.log("Client Edit Set List Page Redirect")
};

export default ClientInfo;