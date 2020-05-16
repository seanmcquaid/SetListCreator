import React from "react";
import Text from "components/Text/Text";
import LinkButton from "components/LinkButton/LinkButton";
import styles from "./BandleaderHomePage.module.css";

const BandleaderHomePage = () => {
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