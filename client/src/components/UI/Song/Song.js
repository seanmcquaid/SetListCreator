import React from "react";
import PropTypes from "prop-types";
import Container from "../Container/Container";
import Button from "../Button/Button";

const Song = props => {
    const {songName, artistName, songKey} = props;
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
            <h4>Song Name : {songName}</h4>
            <h5>Artist Name : {artistName}</h5>
            <p>Key : {songKey}</p>
            <Button 
                onClick={() => props.deleteSongHandler(songName, artistName, songKey)}
                title="Remove"
            />
        </Container>
    )
};

Song.propTypes = {
    songName : PropTypes.string.isRequired,
    artistName : PropTypes.string.isRequired,
    songKey : PropTypes.string.isRequired,
}

export default Song;