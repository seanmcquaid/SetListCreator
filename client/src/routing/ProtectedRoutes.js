import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import LandingPage from "pages/LandingPage/LandingPage";
import ClientLoginPage from "pages/ClientPages/ClientLoginPage/ClientLoginPage";
import ClientRegisterPage from "pages/ClientPages/ClientRegisterPage/ClientRegisterPage";
import BandLeaderLoginPage from "pages/BandLeaderPages/BandLeaderLoginPage/BandLeaderLoginPage";
import BandLeaderRegisterPage from "pages/BandLeaderPages/BandLeaderRegisterPage/BandLeaderRegisterPage";
import ErrorPage from "pages/ErrorPage/ErrorPage";
import BandLeaderHomePage from "pages/BandLeaderPages/BandLeaderHomePage/BandLeaderHomePage";
import ClientHomePage from "pages/ClientPages/ClientHomePage/ClientHomePage";
import AddSongsPage from "pages/BandLeaderPages/AddSongsPage/AddSongsPage";
import ClientListPage from "pages/BandLeaderPages/ClientListPage/ClientListPage";
import BandLeaderEditSongPage from "pages/BandLeaderPages/BandLeaderEditSongPage/BandLeaderEditSongPage";
import ClientEditSongPage from "pages/ClientPages/ClientEditSongPage/ClientEditSongPage";
import BandLeaderProfilePage from "pages/BandLeaderPages/BandLeaderProfilePage/BandLeaderProfilePage";
import ClientSendSetlistPage from "pages/ClientPages/ClientSendSetlistPage/ClientSendSetlistPage";

const ProtectedRoutes = props => {
    const {isAuthenticated, accountType} = props;

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
            <Route exact path="/bandLeader/editProfile" component={BandLeaderProfilePage}/>
            <Route exact path="/bandLeader/clientList" component={ClientListPage}/>
            <Route exact path="/bandLeader/addSongs" component={protectedBandLeaderRouteCheck(AddSongsPage)}/>
            <Route exact path="/bandLeader/editSong/:songId" component={protectedBandLeaderRouteCheck(BandLeaderEditSongPage)}/>
            <Route exact path="/clientHome" component={protectedClientRouteCheck(ClientHomePage)}/>
            <Route exact path="/client/editSong/:songId" component={protectedClientRouteCheck(ClientEditSongPage)}/>
            <Route exact path="/client/sendSetlist" component={ClientSendSetlistPage}/>
            <Route component={ErrorPage}/>
        </Switch>
    )
};

const mapStateToProps = state => ({
    accountType : state.auth.accountType,
    isAuthenticated : state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(ProtectedRoutes);