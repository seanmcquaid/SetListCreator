import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import Loading from "components/Loading/Loading";
import {Redirect, Route} from "react-router-dom";
import {checkTokenAction} from "actions/authActions/authActions";

const ProtectedBandleaderRoute = ({accountType, isAuthenticated, token, ...props}) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(token){
          checkTokenAction();
        }
        setIsLoading(false);
    },[token])

    if(isLoading){
        return <Route {...props} component={Loading}/>
    }

    if(isAuthenticated && accountType === "bandLeader"){
        return <Route {...props}/>
    }

    if(!isLoading && !isAuthenticated && accountType !== "bandLeader"){
        return <Redirect to="/"/>
    }


};

const mapStateToProps = state => ({
    accountType : state.auth.accountType,
    isAuthenticated : state.auth.isAuthenticated,
    token : state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    checkTokenAction : () => dispatch(checkTokenAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedBandleaderRoute);