import React from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import styles from "./Navbar.module.css";

const Navbar = props => {
    const authStatus = useSelector(state => state.auth.isAuthenticated);
    const navBarLeft = authStatus ? "" : "";
    const navBarRight = authStatus ? "" : "";
    return(
        <nav className={styles.navbarContainer}>
            {navBarLeft}
            {navBarRight}
        </nav>
    )
}

export default Navbar;