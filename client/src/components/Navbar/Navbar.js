import React from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import styles from "./Navbar.module.css";

const Navbar = props => {
    const isAuthenticatedStatus = useSelector(state => state.auth.isAuthenticated);
    const userInfo = useSelector(state => state.auth.userInfo);
    const navBarRight = isAuthenticatedStatus ? "" : "";
    return(
        <nav className={styles.navbarContainer}>
            <Link className={styles.navLink} to="/">SLC</Link>
        </nav>
    )
}

export default Navbar;