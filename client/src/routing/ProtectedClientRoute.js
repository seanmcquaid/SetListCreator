import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import Loading from "components/Loading/Loading";
import {Redirect, Route} from "react-router-dom";
import {checkTokenAction} from "actions/authActions/authActions";

const ProtectedClientRoute = ({accountType, isAuthenticated, token, checkTokenAction, ...props}) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(token){
          checkTokenAction();
        }
        setIsLoading(false);
    },[])

    console.log(isLoading)

    if(isLoading){
        return <Route {...props} component={Loading}/>
    }


    if(isAuthenticated && accountType === "client"){
        return <Route {...props} component={props.component}/>
    }

    console.log(accountType, isAuthenticated, token)

    if(!isLoading){
        
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

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedClientRoute);