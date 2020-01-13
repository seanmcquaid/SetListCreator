import React from "react";
import {connect} from "react-redux";
import Loading from "components/Loading/Loading";
import { Redirect } from "react-router-dom";

const ProtectedBandleaderRoute = props => {

    const {accountType, isAuthenticated, isLoading} = props;


};

const mapStateToProps = state => ({
    accountType : state.auth.accountType,
    isAuthenticated : state.auth.isAuthenticated,
    isLoading : state.auth.isLoading
});

export default connect(mapStateToProps, null)(ProtectedBandleaderRoute);