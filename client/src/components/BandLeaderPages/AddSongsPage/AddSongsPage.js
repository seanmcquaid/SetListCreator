import React from "react";
import Container from "../../UI/Container/Container";
import Text from "../../UI/Text/Text";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import styles from "./AddSongsPage.module.css";

const AddSongsPage = props => {
    // render list of songs here
    return(
        <Container centered={true}>
            <Text headerText={true}>Add Songs Page</Text>
            <form className={styles.addSongForm}>
                <Input
                    name="songName"
                />
                <Input
                    name="artistName"
                />
                <Input
                    name="keyName"
                />
                <Button title="Add Song" type="submit"/>
            </form>
            <Container>Songs will render here and get pulled from DB</Container>
        </Container>
    )
};

export default AddSongsPage;