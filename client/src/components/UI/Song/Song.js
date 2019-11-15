import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import styles from "./Song.module.css";

const Song = props => {
    const {songName, artistName, songKey} = props;
    return(
        <div className={styles.songContainer}>
            <h4 className={styles.songName}>Song Name : {songName}</h4>
            <h5 className={styles.artistName}>Artist Name : {artistName}</h5>
            <p className={styles.songKey}>Key : {songKey}</p>
            <Button 
                onClick={() => props.deleteSongHandler(songName, artistName, songKey)}
                title="Remove"
            />
        </div>
    )
};

Song.propTypes = {
    songName : PropTypes.string.isRequired,
    artistName : PropTypes.string.isRequired,
    songKey : PropTypes.string.isRequired,
}

export default Song;