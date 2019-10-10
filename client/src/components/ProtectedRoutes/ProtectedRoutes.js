import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Login from "../Login/Login";


const ProtectedRoutes = props => {
    const protectedRouteCheck = Component => props.auth.isAuthenticated ? Component : () => <Redirect to="/"/>;
    return (
        <Switch>
            {/* Routes here ie : */}
            <Route exact path ="/" component={Login}/> 
        </Switch>
    )
}

const mapStateToProps = state => {
    return {
        auth : state.auth
    }
}

export default connect(mapStateToProps, null)(ProtectedRoutes);

