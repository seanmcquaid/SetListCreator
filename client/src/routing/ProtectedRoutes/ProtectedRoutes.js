import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
// import {createSelector} from "reselect";
import LandingPage from "../../components/LandingPage/LandingPage";
import ClientLoginPage from "../../components/ClientPages/ClientLoginPage/ClientLoginPage";
import ClientRegisterPage from "../../components/ClientPages/ClientRegisterPage/ClientRegisterPage";
import BandLeaderLoginPage from "../../components/BandLeaderPages/BandLeaderLoginPage/BandLeaderLoginPage";
import BandLeaderRegisterPage from "../../components/BandLeaderPages/BandLeaderRegisterPage/BandLeaderRegisterPage";
import ErrorPage from "../../components/ErrorPage/ErrorPage";


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
            <Route component={ErrorPage}/>
        </Switch>
    )
};

export default ProtectedRoutes;

