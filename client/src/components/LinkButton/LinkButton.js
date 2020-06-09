import React from "react";
import {Link} from "react-router-dom";
import styles from "./LinkButton.module.css"; 
import PropTypes from "prop-types";

const LinkButton = React.memo(({route, children}) => (
    <Link className={styles.linkButton} to={route}>
        {children}
    </Link>
));

LinkButton.propTypes = {
    route : PropTypes.string.isRequired,
    children : PropTypes.string.isRequired,
};

LinkButton.defaultProps = {
    route : "/",
    children : "Link Button Name"
};

export default LinkButton;