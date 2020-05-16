import React from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import styles from "./Navbar.module.css";
import Aux from "hoc/Aux/Aux";
import {logoutAction} from "actions/authActions/authActions";
import { selectAuthState } from "selectors/authSelectors";

const Navbar = () => {
    const {isAuthenticated, accountType} = useSelector(selectAuthState);
    const dispatch = useDispatch();

    const logoutButtonOnClick = () => dispatch(logoutAction());
    
    const rightNav = isAuthenticated ? 
        <Aux>
            {accountType === "client" ? 
            <Aux>
                <Link className={styles.navLink} to="/clientHome">Home</Link>
                <Link className={styles.navLink} to="/client/editProfile">Profile</Link>
            </Aux>:
            <Aux>
                <Link className={styles.navLink} to="/bandleader/clientList">Client List</Link>
                <Link className={styles.navLink} to="/bandleader/addSongs">Add Songs</Link>
                <Link className={styles.navLink} to="/bandleader/editProfile">Profile</Link>
            </Aux>}
            <button className={styles.nav} onClick={logoutButtonOnClick}type="button">Logout</button>
        </Aux> : 
        <Aux>
            <Link className={styles.navLink} to="/clientLogin">Client Login</Link>
            <Link className={styles.navLink} to="/bandleaderLogin">Bandleader Login</Link>
        </Aux> ;
    
    const leftNavRoute = isAuthenticated ? accountType === "bandleader"? "/bandleaderHome": "/clientHome" : "/";

    return(
        <nav className={styles.navbarContainer}>
            <div className={styles.leftNav}>
                <Link className={styles.navLink} to={leftNavRoute}>SLC</Link>
            </div>
            <ul className={styles.rightNav}>
                {rightNav}
            </ul>
        </nav>
    )
};

export default Navbar;