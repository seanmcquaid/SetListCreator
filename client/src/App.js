import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import ProtectedRoutes from "./routing/ProtectedRoutes/ProtectedRoutes";
import Layout from './components/Layout/Layout';
import {connect} from "react-redux";
import {checkTokenAction} from "./actions/authActions/authActions"

const App = props => {
  const {token, checkTokenAction, isAuthenticated} = props;
  
  useEffect(() => {
    if(token && isAuthenticated){
      checkTokenAction();
    }
  },[token, checkTokenAction, isAuthenticated])
  
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
  isAuthenticated : state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  checkTokenAction : () => dispatch(checkTokenAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
