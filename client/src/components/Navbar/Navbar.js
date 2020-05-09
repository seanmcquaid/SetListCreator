import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import styles from "./Navbar.module.css";
import Aux from "hoc/Aux/Aux";
import {logoutAction} from "actions/authActions/authActions";

const Navbar = ({isAuthenticated, accountType, logoutAction}) => {
    
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
            <button className={styles.navLinkButton} onClick={() => logoutAction()}type="button">Logout</button>
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

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
    accountType : state.auth.accountType,
});

const mapDispatchToProps = dispatch => ({
    logoutAction : () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);