import React from "react";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
import Aux from "hoc/Aux/Aux";
import styles from "./Layout.module.css";
import PropTypes from "prop-types";

const Layout = React.memo(({children}) => (
    <Aux>
        <Navbar/>
        <div className={styles.mainContentContainer}>
            {children}
        </div>
        <Footer/>
    </Aux>
));

Layout.propTypes = {
    children : PropTypes.any.isRequired,
};

export default Layout;