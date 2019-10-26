import React from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import styles from "./Navbar.module.css";
import Aux from "../../hoc/Aux";
import {logoutAction} from "../../actions/authActions/authActions";

const Navbar = props => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const accountType = useSelector(state => state.auth.accountType);
    const dispatch = useDispatch();
    

    const rightNav = isAuthenticated ? 
        <Aux>
            {accountType === "client" ? "" : ""}
            <button className={styles.navLinkButton} onClick={dispatch(logoutAction())}type="button">Logout</button>
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
}

export default Navbar;