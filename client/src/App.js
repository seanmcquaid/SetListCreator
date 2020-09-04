import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProtectedRoutes from "routing/ProtectedRoutes/ProtectedRoutes";
import Layout from "components/Layout/Layout";
import { checkTokenAction } from "actions/authActions/authActions";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthState } from "selectors/authSelectors/authSelectors";

const App = () => {
  const { token } = useSelector(selectAuthState);
  const dispatch = useDispatch();

  const [isLoadingApp, setIsLoadingApp] = useState(true);

  useEffect(() => {
    if (token && isLoadingApp) {
      dispatch(checkTokenAction());
    }
    setIsLoadingApp(false);
  }, [token, isLoadingApp, dispatch]);

  return (
    <Router>
      <Layout>
        <Route path="/" component={ProtectedRoutes} />
      </Layout>
    </Router>
  );
};

export default App;
