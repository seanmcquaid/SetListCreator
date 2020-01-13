import React, {useEffect, useState} from "react";
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
import {checkTokenAction} from "actions/authActions/authActions";
import ProtectedBandLeaderRoute from "./ProtectedBandleaderRoute";
import ProtectedClientRoute from "./ProtectedClientRoute";

const ProtectedRoutes = props => {

    return (
        <Switch>
            <Route exact path="/" component={LandingPage}/>
            <Route exact path="/clientLogin" component={ClientLoginPage}/>
            <Route exact path="/clientRegister" component={ClientRegisterPage}/>
            <Route exact path="/bandLeaderLogin" component={BandLeaderLoginPage}/>
            <Route exact path="/bandLeaderRegister" component={BandLeaderRegisterPage}/>
            <Route exact path="/bandLeaderHome" component={BandLeaderHomePage}/>
            <Route exact path="/bandLeader/editProfile" component={BandLeaderProfilePage}/>
            <Route exact path="/bandLeader/clientList" component={ClientListPage}/>
            <Route exact path="/bandLeader/addSongs" component={AddSongsPage}/>
            <Route exact path="/bandLeader/editSong/:songId" component={BandLeaderEditSongPage}/>
            <ProtectedClientRoute exact path="/clientHome" stuff={ClientHomePage}/>
            <Route exact path="/client/editSong/:songId" component={ClientEditSongPage}/>
            <Route exact path="/client/sendSetlist" component={ClientSendSetlistPage}/>
            <Route component={ErrorPage}/>
        </Switch>
    )
};

const mapStateToProps = state => ({
    accountType : state.auth.accountType,
    isAuthenticated : state.auth.isAuthenticated,
    token : state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    checkTokenAction : () => dispatch(checkTokenAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoutes);