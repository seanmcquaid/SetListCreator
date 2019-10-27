import React, {useState} from "react";
import Container from "../../UI/Container/Container";
import Text from "../../UI/Text/Text";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import styles from "./AddSongsPage.module.css";

const AddSongsPage = props => {
    const [songName, setSongName] = useState("");
    const [artistName, setArtistName] = useState("");
    const [key, setKey] = useState("");
    

    const songNameOnChangeHandler = event => {
        setSongName(event.target.value);
    };

    const artistNameOnChangeHandler = event => {
        setArtistName(event.target.value);
    };
    
    const keyOnChangeHandler = event => {
        setKey(event.target.value);
    };

    const addSongSubmitHandler = event => {
        event.preventDefault();
        
    }



    return(
        <Container centered={true}>
            <Text headerText={true}>Add Songs Page</Text>
            <form className={styles.addSongForm}>
                <Input
                    name="songName"
                    title="Song Name"
                    type="text"
                    placeholder="Enter song name here"
                    value={songName}
                    onChangeHandler={songNameOnChangeHandler}
                />
                <Input
                    name="artistName"
                    title="Artist Name"
                    type="text"
                    placeholder="Enter artist name here"
                    value={artistName}
                    onChangeHandler={artistNameOnChangeHandler}
                />
                <Input
                    name="keyName"
                    title="Key"
                    type="text"
                    placeholder="Enter key here"
                    value={key}
                    onChangeHandler={keyOnChangeHandler}
                />
                <Button title="Add Song" type="submit"/>
            </form>
            <Container>Songs will render here and get pulled from DB</Container>
        </Container>
    )
};

export default AddSongsPage;