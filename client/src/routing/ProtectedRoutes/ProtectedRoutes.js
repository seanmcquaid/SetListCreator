import React from "react";
import {Route, Switch} from "react-router-dom";
import LandingPage from "pages/LandingPage/LandingPage";
import ClientLoginPage from "pages/ClientPages/ClientLoginPage/ClientLoginPage";
import ClientRegisterPage from "pages/ClientPages/ClientRegisterPage/ClientRegisterPage";
import BandleaderLoginPage from "pages/BandleaderPages/BandleaderLoginPage/BandleaderLoginPage";
import BandleaderRegisterPage from "pages/BandleaderPages/BandleaderRegisterPage/BandleaderRegisterPage";
import ErrorPage from "pages/ErrorPage/ErrorPage";
import BandleaderHomePage from "pages/BandleaderPages/BandleaderHomePage/BandleaderHomePage";
import ClientHomePage from "pages/ClientPages/ClientHomePage/ClientHomePage";
import AddSongsPage from "pages/BandleaderPages/AddSongsPage/AddSongsPage";
import ClientListPage from "pages/BandleaderPages/ClientListPage/ClientListPage";
import BandleaderEditSongPage from "pages/BandleaderPages/BandleaderEditSongPage/BandleaderEditSongPage";
import ClientEditSongPage from "pages/ClientPages/ClientEditSongPage/ClientEditSongPage";
import BandleaderProfilePage from "pages/BandleaderPages/BandleaderProfilePage/BandleaderProfilePage";
import ClientSendSetListPage from "pages/ClientPages/ClientSendSetListPage/ClientSendSetListPage";
import ProtectedBandleaderRoute from "../ProtectedBandleaderRoute/ProtectedBandleaderRoute";
import ProtectedClientRoute from "../ProtectedClientRoute/ProtectedClientRoute";
import ClientInfoPage from "pages/BandleaderPages/ClientInfoPage/ClientInfoPage";
import ClientProfilePage from "pages/ClientPages/ClientProfilePage/ClientProfilePage";
import SetListCreatorPage from "pages/BandleaderPages/SetListCreatorPage/SetListCreatorPage";
import ClientFinalSetListPage from "pages/BandleaderPages/ClientFinalSetListPage/ClientFinalSetListPage";
import ClientSetListApprovalPage from "pages/ClientPages/ClientSetListApprovalPage/ClientSetListApprovalPage";
import FinalizedSetListPage from "pages/ClientPages/FinalizedSetListPage/FinalizedSetListPage";

const ProtectedRoutes = props => (
    <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/clientLogin" component={ClientLoginPage}/>
        <Route exact path="/clientRegister" component={ClientRegisterPage}/>
        <Route exact path="/bandleaderLogin" component={BandleaderLoginPage}/>
        <Route exact path="/bandleaderRegister" component={BandleaderRegisterPage}/>
        <Route exact path="/bandleaderHome" component={BandleaderHomePage}/>
        <Route exact path="/bandleader/editProfile" component={BandleaderProfilePage}/>
        <Route exact path="/bandleader/clientList" component={ClientListPage}/>
        <Route exact path="/bandleader/addSongs" component={AddSongsPage}/>
        <Route exact path="/bandleader/editSong/:songId" component={BandleaderEditSongPage}/>
        <Route exact path="/bandleader/createSetList/:clientId" component={SetListCreatorPage}/>
        <Route exact path="/bandleader/clientFinalSetList/:clientId" component={ClientFinalSetListPage}/>
        <Route exact path="/clientHome" component={ClientHomePage}/>
        <Route exact path="/client/editProfile" component={ClientProfilePage}/>
        <Route exact path="/client/editSong/:songId" component={ClientEditSongPage}/>
        <Route exact path="/client/sendSetList" component={ClientSendSetListPage}/>
        <Route exact path="/clientInfo/:clientId" component={ClientInfoPage}/>
        <Route exact path="/client/setListApproval" component={ClientSetListApprovalPage}/>
        <Route exact path="/client/finalizedSetList" component={FinalizedSetListPage}/>
        <Route component={ErrorPage}/>
    </Switch>
);

export default ProtectedRoutes;