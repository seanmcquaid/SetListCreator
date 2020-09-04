import React from "react";
import { Route, Switch } from "react-router-dom";
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
import ClientEditSetListPage from "pages/BandleaderPages/ClientEditSetListPage/ClientEditSetListPage";
import onLeave from "hoc/onLeave/onLeave";
import BandleaderEditSongPage from "pages/BandleaderPages/BandleaderEditSongPage/BandleaderEditSongPage";

const ProtectedRoutes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/clientLogin" component={ClientLoginPage} />
    <Route exact path="/clientRegister" component={ClientRegisterPage} />
    <Route exact path="/bandleaderLogin" component={BandleaderLoginPage} />
    <Route
      exact
      path="/bandleaderRegister"
      component={BandleaderRegisterPage}
    />
    <ProtectedBandleaderRoute
      exact
      path="/bandleaderHome"
      component={BandleaderHomePage}
    />
    <ProtectedBandleaderRoute
      exact
      path="/bandleader/editProfile"
      component={BandleaderProfilePage}
    />
    <ProtectedBandleaderRoute
      exact
      path="/bandleader/clientList"
      component={ClientListPage}
    />
    <ProtectedBandleaderRoute
      exact
      path="/bandleader/addSongs"
      component={AddSongsPage}
    />
    <ProtectedBandleaderRoute
      exact
      path="/bandleader/editSong/:songId"
      component={BandleaderEditSongPage}
    />
    <ProtectedBandleaderRoute
      exact
      path="/bandleader/clientInfo/:clientId"
      component={ClientInfoPage}
    />
    <ProtectedBandleaderRoute
      exact
      path="/bandleader/createSetList/:clientId"
      component={SetListCreatorPage}
    />
    <ProtectedBandleaderRoute
      exact
      path="/bandleader/clientEditSetList/:clientId"
      component={ClientEditSetListPage}
    />
    <ProtectedBandleaderRoute
      exact
      path="/bandleader/clientFinalSetList/:clientId"
      component={ClientFinalSetListPage}
    />
    <ProtectedClientRoute exact path="/clientHome" component={ClientHomePage} />
    <ProtectedClientRoute
      exact
      path="/client/editProfile"
      component={ClientProfilePage}
    />
    <ProtectedClientRoute
      exact
      path="/client/editSong/:songId"
      component={ClientEditSongPage}
    />
    <ProtectedClientRoute
      exact
      path="/client/sendSetList"
      component={ClientSendSetListPage}
    />
    <ProtectedClientRoute
      exact
      path="/client/setListApproval"
      component={ClientSetListApprovalPage}
    />
    <ProtectedClientRoute
      exact
      path="/client/finalizedSetList"
      component={FinalizedSetListPage}
    />
    <Route component={ErrorPage} />
  </Switch>
);

export default onLeave(ProtectedRoutes);
