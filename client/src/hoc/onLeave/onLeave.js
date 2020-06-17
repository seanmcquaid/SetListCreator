import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearErrorMessageAction } from "actions/errorActions/errorActions";
import { useHistory } from "react-router-dom";

const onLeave = WrappedComponent => {

    const OnLeaveHOC = props => {
        const history = useHistory();
        const dispatch = useDispatch();

        useEffect(() => {
            history.listen(() => {
                dispatch(clearErrorMessageAction());
            });
        },[history, dispatch]);
    
        return <WrappedComponent {...props}/>;
    };
    
    return OnLeaveHOC;
};

export default onLeave;