import React from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

const Navbar = props => {
    const authStatus = useSelector(state => state.auth.isAuthenticated);
    const navBarLeft = authStatus ? "" : "";
    const navBarRight = authStatus ? "" : "";
    return(
        <nav>
            {navBarLeft}
            {navBarRight}
        </nav>
    )
}

export default Navbar;