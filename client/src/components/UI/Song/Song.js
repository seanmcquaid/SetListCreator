import React from "react";
import PropTypes from "prop-types";
import Container from "../Container/Container";

const Song = props => {
    return(
        <Container additionalStyles={{
            "border" : "2px solid #00a118",
            "flexBasis" : "30%",
            "flexShrink" : "1",
            "margin" : "1rem",
            "width" : "100%",
            "maxWidth" : "10rem",
            "color" : "#555555"
        }}>
            <h4>Song Name : {props.songName}</h4>
            <h5>Artist Name : {props.artistName}</h5>
            <p>Key : {props.songKey}</p>
        </Container>
    )
};

Song.propTypes = {
    songName : PropTypes.string.isRequired,
    artistName : PropTypes.string.isRequired,
    songKey : PropTypes.string.isRequired,
}

export default Song;