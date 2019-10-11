import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import LandingPage from "../LandingPage/LandingPage";


const ProtectedRoutes = props => {
    const protectedRouteCheck = Component => props.auth.isAuthenticated ? Component : () => <Redirect to="/"/>;
    return (
        <Switch>
            <Route exact path ="/" component={LandingPage}/> 
        </Switch>
    )
}

const mapStateToProps = state => {
    return {
        auth : state.auth
    }
}

export default connect(mapStateToProps, null)(ProtectedRoutes);

