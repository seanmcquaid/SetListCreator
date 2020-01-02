import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import styles from "./Navbar.module.css";
import Aux from "hoc/Aux/Aux";
import {logoutAction} from "actions/authActions/authActions";

const Navbar = props => {
    const {isAuthenticated, accountType, logoutAction} = props;

    const rightNav = isAuthenticated ? 
        <Aux>
            {accountType === "client" ? 
            <Aux>
                <Link className={styles.navLink} to="/clientHome">Home</Link>
            </Aux>:
            <Aux>
                <Link className={styles.navLink} to="/bandLeader/setListCreator">Set List Creator</Link>
                <Link className={styles.navLink} to="/bandLeader/clientList">Client List</Link>
                <Link className={styles.navLink} to="/bandLeader/emailBand">Email Band</Link>
                <Link className={styles.navLink} to="/bandLeader/addSongs">Add Songs</Link>
            </Aux>}
            <button className={styles.navLinkButton} onClick={() => logoutAction()}type="button">Logout</button>
        </Aux> : 
        <Aux>
            <Link className={styles.navLink} to="/clientLogin">Client Login</Link>
            <Link className={styles.navLink} to="/bandLeaderLogin">BandLeader Login</Link>
        </Aux> ;
    
    return(
        <nav className={styles.navbarContainer}>
            <div className={styles.leftNav}>
                <Link className={styles.navLink} to={"/"}>SLC</Link>
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