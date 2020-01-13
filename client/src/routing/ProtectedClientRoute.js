import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import Loading from "components/Loading/Loading";
import {Redirect, Route} from "react-router-dom";
import {checkTokenAction} from "actions/authActions/authActions";

const ProtectedClientRoute = props => {
    const [isLoading, setIsLoading] = useState(true);
    const {accountType, isAuthenticated, token, exact, path, stuff} = props;
    console.log(stuff);
    console.log(props);

    useEffect(() => {
        if(token){
          checkTokenAction();
          setIsLoading(false);
        }
    },[token])

    if(isLoading){
        return () => <Route exact={exact} path={path} component={<Loading/>}/>
    }

    if(isAuthenticated && accountType === "client"){
        return <Route exact={exact} path={path} component={<stuff/>}/>
    }

    return () => <Redirect to="/"/>


};

const mapStateToProps = state => ({
    accountType : state.auth.accountType,
    isAuthenticated : state.auth.isAuthenticated,
    token : state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    checkTokenAction : () => dispatch(checkTokenAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedClientRoute);