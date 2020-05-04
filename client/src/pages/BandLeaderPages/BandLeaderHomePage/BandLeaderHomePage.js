import React from "pages/BandleaderPages/BandleaderHomePage/node_modules/react";
import Text from "pages/BandleaderPages/BandleaderHomePage/node_modules/components/Text/Text";
import LinkButton from "pages/BandleaderPages/BandleaderHomePage/node_modules/components/LinkButton/LinkButton";
import styles from "./BandleaderHomePage.module.css";

const BandleaderHomePage = props => {
    return(
        <div className={styles.bandleaderHomePageContainer}>
            <Text headerText={true}>Band Leader Home Page</Text>
            <div className={styles.linkButtonsContainer}>
                <LinkButton route="/bandLeader/editProfile">Edit Profile</LinkButton>
                <LinkButton route="/bandLeader/clientList">Client List</LinkButton>
                <LinkButton route="/bandLeader/addSongs">Add Songs To Your Database</LinkButton>
            </div>
        </div>
    )
};

export default BandleaderHomePage;