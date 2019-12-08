import React from "react";
import Navbar from "../UI/Navbar/Navbar";
import Footer from "../UI/Footer/Footer";
import Aux from "../../hoc/Aux";
import styles from "./Layout.module.css";

const Layout = props => {
    return(
        <Aux>
            <Navbar/>
            <div className={styles.mainContentContainer}>
                {props.children}
            </div>
            <Footer/>
        </Aux>
    )
}

export default Layout;