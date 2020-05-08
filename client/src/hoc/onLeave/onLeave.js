import React, { useEffect } from "react";
import { connect } from "react-redux";
import { clearErrorMessage } from "actions/errorActions/errorActions";

const onLeave = WrappedComponent => {

    const mapDispatchToProps = dispatch => ({
        clearErrorMessage : () => dispatch(clearErrorMessage())
    });

    const OnLeaveHOC = props => {
        const {history, clearErrorMessage} = props;

        useEffect(() => {
            history.listen(() => {
                clearErrorMessage();
            });
        },[history, clearErrorMessage]);
    
        return <WrappedComponent {...props}/>;
    };
    
    return connect(null, mapDispatchToProps)(OnLeaveHOC);
};

export default onLeave;