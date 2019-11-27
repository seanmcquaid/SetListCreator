import React from "react";
import Text from "../../UI/Text/Text";
import LinkButton from "../../UI/LinkButton/LinkButton";

const BandLeaderHomePage = props => {
    return(
        <div>
            <Text headerText={true}>Band Leader Home Page</Text>
            <div>
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