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
}) => (
    <div className={styles.clientInfoContainer} data-testid={`${clientName}Info`}>
        <h4 className={styles.clientName}>{clientName}</h4>
        <Text>Set List Status :  
            {clientApproved && setListAvailable ? 
                " Complete" : 
                clientApproved === null && setListAvailable ? 
                    " Ready" : 
                    " Needs Edits"}
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
));

ClientInfo.propTypes = {
    clientName : PropTypes.string.isRequired, 
    clientApproved : PropTypes.bool, 
    setListAvailable : PropTypes.bool.isRequired,
    clientFinalSetListPageRedirect : PropTypes.func.isRequired, 
    clientPageRedirect : PropTypes.func.isRequired, 
    clientEditSetListPageRedirect : PropTypes.func.isRequired, 
};

export default ClientInfo;