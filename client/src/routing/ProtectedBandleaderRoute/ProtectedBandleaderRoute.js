import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import {Redirect, Route} from "react-router-dom";
import { selectAuthState } from "selectors/authSelectors";

const ProtectedBandleaderRoute = props => {
    const {isAuthenticated, accountType} = useSelector(selectAuthState);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    },[]);

    if(isLoading){
        return <LoadingSpinner isLoading={isLoading}/>;
    }

    if(!isAuthenticated){
        return <Redirect to="/"/>;
    }

    if(accountType !== "bandleader"){
        return <Redirect to="/"/>;
    }

    return <Route {...props}/>;
};

export default ProtectedBandleaderRoute;