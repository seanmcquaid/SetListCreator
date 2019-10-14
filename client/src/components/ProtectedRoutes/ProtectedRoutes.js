import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
// import {createSelector} from "reselect";
import LandingPage from "../LandingPage/LandingPage";


// const selectIsAuthenticated = createSelector(
//     state => state.auth,
//     auth => auth.isAuthenticated
// )


const ProtectedRoutes = props => {
    const protectedRouteCheck = Component => props.auth.isAuthenticated ? Component : () => <Redirect to="/"/>;
    // const authState = useSelector(selectIsAuthenticated);
    return (
        <Switch>
            <Route exact path ="/" component={LandingPage}/> 
        </Switch>
    )
}

export default ProtectedRoutes;

