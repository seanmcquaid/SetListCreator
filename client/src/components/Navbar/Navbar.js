import React, { useState} from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import styles from "./Navbar.module.css";
import Aux from "hoc/Aux/Aux";
import {logoutAction} from "actions/authActions/authActions";
import { selectAuthState } from "selectors/authSelectors";
import useWindowSize from "hooks/useWIndowSize";
import {GiHamburgerMenu as HamburgerIcon} from "react-icons/gi"

const Navbar = () => {
    const {isAuthenticated, accountType} = useSelector(selectAuthState);
    const dispatch = useDispatch();

    const [isMobileNavToggled, setIsMobileNavToggled] = useState(false);
    const screenSize = useWindowSize();
    
    const mobileNavButtonOnClick = () => setIsMobileNavToggled(!isMobileNavToggled);

    const logoutButtonOnClick = () => dispatch(logoutAction());

    const mobileNavStyle = {
        display : isMobileNavToggled ? "flex" : screenSize.width < 750 ? "none" : "flex"
    };

    const hamburgerIconStyle = {
        display : "flex"
    };
    
    const rightNav = isAuthenticated ? 
        <Aux>
            {accountType === "client" ? 
            <Aux>
                <Link className={styles.rightNavLink} to="/clientHome" style={mobileNavStyle}>Home</Link>
                <Link className={styles.rightNavLink} to="/client/editProfile" style={mobileNavStyle}>Profile</Link>
            </Aux>:
            <Aux>
                <Link className={styles.rightNavLink} to="/bandleader/clientList" style={mobileNavStyle}>Client List</Link>
                <Link className={styles.rightNavLink} to="/bandleader/addSongs" style={mobileNavStyle}>Add Songs</Link>
                <Link className={styles.rightNavLink} to="/bandleader/editProfile" style={mobileNavStyle}>Profile</Link>
            </Aux>}
            <button className={styles.navLinkButton} onClick={logoutButtonOnClick} type="button" style={mobileNavStyle}>Logout</button>
        </Aux> : 
        <Aux>
            <Link className={styles.rightNavLink} to="/clientLogin" style={mobileNavStyle}>Client</Link>
            <Link className={styles.rightNavLink} to="/bandleaderLogin" style={mobileNavStyle}>Bandleader</Link>
        </Aux> ;
    
    const leftNavRoute = isAuthenticated ? accountType === "bandleader"? "/bandleaderHome": "/clientHome" : "/";

    return(
        <nav className={styles.navbarContainer}>
            <div className={styles.leftNav}>
                <Link className={styles.leftNavLink} to={leftNavRoute}>SLC</Link>
            </div>
            <ul className={styles.rightNav}>
                <HamburgerIcon
                    className={styles.hamburgerMenu}
                    onClick={mobileNavButtonOnClick}
                    style={hamburgerIconStyle}
                />
                {rightNav}
            </ul>
        </nav>
    )
};

export default Navbar;