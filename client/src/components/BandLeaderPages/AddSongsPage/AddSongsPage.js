import React from "react";
import Container from "../../UI/Container/Container";
import Text from "../../UI/Text/Text";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

const AddSongsPage = props => {
    // render list of songs here
    return(
        <Container centered={true}>
            <Text headerText={true}>Add Songs Page</Text>
            <form>
                <Input/>
                <Input/>
                <Button title="Add Song" type="submit"/>
            </form>
            <Container>Songs will render here and get pulled from DB</Container>
        </Container>
    )
};

export default AddSongsPage;