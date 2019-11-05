import React from "react";
import PropTypes from "prop-types";
import Container from "../Container/Container";

const Song = props => {
    return(
        <Container additionalStyles={{
            "border" : "2px solid black",
            "flex-basis" : "32%",
            "flex-shrink" : "1"
        }}>
            <h4>{props.songName}</h4>
            <h5>{props.artistName}</h5>
            <p>{props.songKey}</p>
        </Container>
    )
};

Song.propTypes = {
    songName : PropTypes.string.isRequired,
    artistName : PropTypes.string.isRequired,
    songKey : PropTypes.string.isRequired,
}

export default Song;