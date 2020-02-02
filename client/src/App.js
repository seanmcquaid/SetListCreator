import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom"
import ProtectedRoutes from "routing/ProtectedRoutes/ProtectedRoutes";
import Layout from "components/Layout/Layout";
import { checkTokenAction } from "actions/authActions/authActions";
import { connect } from "react-redux";

const App = props => {
  const {token, checkTokenAction} = props;
  const [isLoadingApp, setIsLoadingApp] = useState(true);

  useEffect(() => {
      if(token && isLoadingApp){
          checkTokenAction();
      }
      setIsLoadingApp(false);
  }, [checkTokenAction, token, isLoadingApp])

  return (
    <Router>
      <Layout>
        <Route path="/" component={ProtectedRoutes} />
      </Layout>
    </Router>
  );
}

const mapStateToProps = state => ({
  token : state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  checkTokenAction : () => dispatch(checkTokenAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
