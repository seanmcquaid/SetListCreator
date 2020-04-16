import React from "react";
import {Route, Switch} from "react-router-dom";
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
import ProtectedBandleaderRoute from "../ProtectedBandleaderRoute/ProtectedBandleaderRoute";
import ProtectedClientRoute from "../ProtectedClientRoute/ProtectedClientRoute";
import ClientInfoPage from "pages/BandLeaderPages/ClientInfoPage/ClientInfoPage";
import ClientProfilePage from "pages/ClientPages/ClientProfilePage/ClientProfilePage";

const ProtectedRoutes = props => (
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
        <Route exact path="/clientHome" component={ClientHomePage}/>
        <Route exact path="/client/editProfile" component={ClientProfilePage}/>
        <Route exact path="/client/editSong/:songId" component={ClientEditSongPage}/>
        <Route exact path="/client/sendSetlist" component={ClientSendSetlistPage}/>
        <Route exact path="/clientInfo/:clientId" component={ClientInfoPage}/>
        <Route component={ErrorPage}/>
    </Switch>
);

export default ProtectedRoutes;