import React from "react";
import Container from "../../UI/Container/Container";
import Text from "../../UI/Text/Text";
import Input from "../../UI/Input/Input";
import {connect} from "react-redux";

const ClientHomePage = props => {
    return(
        <Container centered={true}>
            <Text headerText={true}>Musical Preferences Page</Text>
            {/* lists here with accompanying form */}
            <div>
                <div>
                    <Text>Requested Songs</Text>
                    <form>
                        <Input
                            name="requestedSongName"
                        />
                        <Input
                            name="requestedSongArtist"
                        />
                    </form>
                    <div></div>
                    Play List with form
                </div>
                <div>
                    <Text>DO NOT play list</Text>
                    <form>
                        <Input
                            name="doNotPlaylistSongName"
                        />
                        <Input
                            name="doNotPlaylistSongArtist"
                        />
                    </form>
                    <div></div>
                    Do Not List with form
                </div>
            </div>
        </Container>
    )
};

const mapStateToProps = state => ({
    client : state.client
});

const mapDispatchToProps = dispatch => {
    return {
        // insert actions here
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientHomePage);