import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import ProtectedRoutes from "./routing/ProtectedRoutes/ProtectedRoutes";
import Layout from './components/Layout/Layout';
import {useSelector, useDispatch} from "react-redux";
import {checkTokenAction} from "./actions/authActions/authActions"

const App = props => {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if(token){
      dispatch(checkTokenAction());
    }
  },[token, dispatch])

  return (
    <Router>
      <Layout>
        <Route path="/" component={ProtectedRoutes} />
      </Layout>
    </Router>
  );
}

export default App;
