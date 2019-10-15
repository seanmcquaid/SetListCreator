import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {createSelector} from "reselect";
import LandingPage from "../../components/LandingPage/LandingPage";
import ClientLoginPage from "../../components/ClientPages/ClientLoginPage/ClientLoginPage";
import ClientRegisterPage from "../../components/ClientPages/ClientRegisterPage/ClientRegisterPage";
import BandLeaderLoginPage from "../../components/BandLeaderPages/BandLeaderLoginPage/BandLeaderLoginPage";
import BandLeaderRegisterPage from "../../components/BandLeaderPages/BandLeaderRegisterPage/BandLeaderRegisterPage";
import ErrorPage from "../../components/ErrorPage/ErrorPage";


const selectIsAuthenticated = createSelector(
    state => state.auth,
    auth => auth.isAuthenticated
);


const ProtectedRoutes = props => {
    const authState = useSelector(selectIsAuthenticated);
    const protectedRouteCheck = Component => authState ? Component : () => <Redirect to="/"/>;
    return (
        <Switch>
            <Route exact path ="/" component={LandingPage}/>
            <Route exact path ="/clientLogin" component={ClientLoginPage}/>
            <Route exact path ="/clientRegister" component={ClientRegisterPage}/>
            <Route exact path ="/bandLeaderLogin" component={BandLeaderLoginPage}/>
            <Route exact path ="/bandLeaderRegister" component={BandLeaderRegisterPage}/>
            <Route component={ErrorPage}/>
        </Switch>
    )
};

export default ProtectedRoutes;

