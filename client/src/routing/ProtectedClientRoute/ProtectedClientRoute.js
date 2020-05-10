import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import {Redirect, Route} from "react-router-dom";
import {checkTokenAction} from "actions/authActions/authActions";

const ProtectedClientRoute = props => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    },[]);

    if(isLoading){
        return <LoadingSpinner isLoading={isLoading}/>;
    }

    if(!props.isAuthenticated){
        return <Redirect to="/"/>;
    }

    if(props.accountType !== "client"){
        return <Redirect to="/"/>;
    }

    return <Route {...props}/>;
};

const mapStateToProps = state => ({
    accountType : state.auth.accountType,
    isAuthenticated : state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
    checkTokenAction : () => dispatch(checkTokenAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedClientRoute);