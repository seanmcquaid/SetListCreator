import React, {useEffect} from "react";
import {connect} from "react-redux";
import Loading from "components/Loading/Loading";
import {Redirect, Route} from "react-router-dom";
import {checkTokenAction} from "actions/authActions/authActions";

const ProtectedClientRoute = ({accountType, isAuthenticated, token, checkTokenAction, isLoading, ...props}) => {


    useEffect(() => {
        if(token){
            checkTokenAction();
        }
    }, [checkTokenAction, token])


    if(isLoading){
        return <Route {...props} component={Loading}/>
    }


    if(isAuthenticated && accountType === "client"){
        return <Route {...props} component={props.component}/>
    }


    if(!(isLoading && !isAuthenticated) || !(isLoading && accountType !== "client")){
        return <Redirect to="/"/>
    }

    return null;

};

const mapStateToProps = state => ({
    accountType : state.auth.accountType,
    isAuthenticated : state.auth.isAuthenticated,
    token : state.auth.token,
    isLoading : state.auth.isLoading,
});

const mapDispatchToProps = dispatch => ({
    checkTokenAction : () => dispatch(checkTokenAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedClientRoute);