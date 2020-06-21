import React, { useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import styles from "./Navbar.module.css";
import Aux from "hoc/Aux/Aux";
import {logoutAction} from "actions/authActions/authActions";
import { selectAuthState } from "selectors/authSelectors/authSelectors";
import useWindowSize from "hooks/useWindowSize";
import {GiHamburgerMenu as HamburgerIcon} from "react-icons/gi"

const Navbar = React.memo(() => {
    const {isAuthenticated, accountType} = useSelector(selectAuthState);
    const dispatch = useDispatch();

    const [isMobileNavToggled, setIsMobileNavToggled] = useState(false);
    const screenSize = useWindowSize();

    useEffect(() => {
        if(screenSize.width > 750){
            setIsMobileNavToggled(false);
        }
    },[screenSize.width])
    
    const mobileNavButtonOnClick = () => {
        if(screenSize.width < 750){
            setIsMobileNavToggled(!isMobileNavToggled);
        }
    };

    const logoutButtonOnClick = () => {
        dispatch(logoutAction());
        if(screenSize.width < 750){
            setIsMobileNavToggled(!isMobileNavToggled);
        }
    };

    const mobileNavStyle = {
        display : isMobileNavToggled ? "flex" : screenSize.width < 750 ? "none" : "flex"
    };

    const rightNav = isAuthenticated ? 
        <Aux>
            {accountType === "client" ? 
            <Aux>
                <Link className={styles.rightNavLink} to="/clientHome" style={mobileNavStyle} onClick={mobileNavButtonOnClick}>Home</Link>
                <Link className={styles.rightNavLink} to="/client/editProfile" style={mobileNavStyle} onClick={mobileNavButtonOnClick}>Profile</Link>
            </Aux>:
            <Aux>
                <Link className={styles.rightNavLink} to="/bandleader/clientList" style={mobileNavStyle} onClick={mobileNavButtonOnClick}>Client List</Link>
                <Link className={styles.rightNavLink} to="/bandleader/addSongs" style={mobileNavStyle} onClick={mobileNavButtonOnClick}>Add Songs</Link>
                <Link className={styles.rightNavLink} to="/bandleader/editProfile" style={mobileNavStyle} onClick={mobileNavButtonOnClick}>Profile</Link>
            </Aux>}
            <button className={styles.navLinkButton} onClick={logoutButtonOnClick} type="button" style={mobileNavStyle}>Logout</button>
        </Aux> : 
        <Aux>
            <Link className={styles.rightNavLink} to="/clientLogin" style={mobileNavStyle} onClick={mobileNavButtonOnClick}>Client</Link>
            <Link className={styles.rightNavLink} to="/bandleaderLogin" style={mobileNavStyle} onClick={mobileNavButtonOnClick}>Bandleader</Link>
        </Aux> ;
    
    const leftNavRoute = isAuthenticated ? accountType === "bandleader"? "/bandleaderHome": "/clientHome" : "/";

    return(
        <nav className={styles.navbarContainer} data-testid="navbar">
            <div className={styles.leftNav}>
                <Link className={styles.leftNavLink} to={leftNavRoute} onClick={mobileNavButtonOnClick}>SLC</Link>
            </div>
            <div className={styles.hamburgerMenuContainer}>
                <HamburgerIcon
                    className={styles.hamburgerMenu}
                    onClick={mobileNavButtonOnClick}
                />
            </div>
            <ul className={styles.rightNav}>
                {rightNav}
            </ul>
        </nav>
    )
});

export default Navbar;