import React from "react";
import styles from "./Footer.module.css";
import Text from "../Text/Text";

const Footer = React.memo(() => (
    <div className={styles.footerContainer}>
        <Text>© Sean McQuaid 2019</Text>
    </div>
));

export default Footer;