import React from "react";
import Text from "components/Text/Text";
import LinkButton from "components/LinkButton/LinkButton";
import styles from "./BandLeaderHomePage.module.css";

const BandLeaderHomePage = props => {
    return(
        <div className={styles.bandLeaderHomePageContainer}>
            <Text headerText={true}>Band Leader Home Page</Text>
            <div className={styles.linkButtonsContainer}>
                <LinkButton route="/bandLeader/editProfile">Edit Profile</LinkButton>
                <LinkButton route="/bandLeader/setListCreator">Set List Creator</LinkButton>
                <LinkButton route="/bandLeader/clientList">Client List</LinkButton>
                <LinkButton route="/bandLeader/clientSongRequestLists">Client Song Request Lists</LinkButton>
                <LinkButton route="/bandLeader/emailBand">Email Band</LinkButton>
                <LinkButton route="/bandLeader/addSongs">Add Songs To Your Database</LinkButton>
            </div>
        </div>
    )
};

export default BandLeaderHomePage;