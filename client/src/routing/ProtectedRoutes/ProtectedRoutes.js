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
import BandLeaderHomePage from "../../components/BandLeaderPages/BandLeaderHomePage/BandLeaderHomePage";
import ClientHomePage from "../../components/ClientPages/ClientHomePage/ClientHomePage";
import AddSongsPage from "../../components/BandLeaderPages/AddSongsPage/AddSongsPage";


const selectIsAuthenticated = createSelector(
    state => state.auth,
    auth => auth.isAuthenticated
);

const selectAccountType = createSelector(
    state => state.auth,
    auth => auth.accountType
);

const ProtectedRoutes = props => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const accountType = useSelector(selectAccountType);

    const protectedClientRouteCheck = Component => isAuthenticated && accountType === "client" ? Component : () => <Redirect to="/"/>;
    const protectedBandLeaderRouteCheck = Component => isAuthenticated && accountType === "bandLeader" ? Component : () => <Redirect to="/"/>;

    return (
        <Switch>
            <Route exact path="/" component={LandingPage}/>
            <Route exact path="/clientLogin" component={ClientLoginPage}/>
            <Route exact path="/clientRegister" component={ClientRegisterPage}/>
            <Route exact path="/bandLeaderLogin" component={BandLeaderLoginPage}/>
            <Route exact path="/bandLeaderRegister" component={BandLeaderRegisterPage}/>
            <Route exact path="/bandLeaderHome" component={protectedBandLeaderRouteCheck(BandLeaderHomePage)}/>
            <Route exact path="/bandLeader/addSongs" component={protectedBandLeaderRouteCheck(AddSongsPage)}/>
            <Route exact path="/clientHome" component={protectedClientRouteCheck(ClientHomePage)}/>
            <Route component={ErrorPage}/>
        </Switch>
    )
};

export default ProtectedRoutes;

