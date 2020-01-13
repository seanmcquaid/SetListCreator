import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom"
import ProtectedRoutes from "routing/ProtectedRoutes";
import Layout from "components/Layout/Layout";

const App = props => {

  return (
    <Router>
      <Layout>
        <Route path="/" component={ProtectedRoutes} />
      </Layout>
    </Router>
  );
}

export default App;
