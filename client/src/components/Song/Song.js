import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import LinkButton from "../LinkButton/LinkButton";
import styles from "./Song.module.css";

const Song = React.memo(
  ({
    songName,
    artistName,
    songKey,
    deleteSongHandler,
    songId,
    isEditable,
  }) => {
    return (
      <div
        className={styles.songContainer}
        data-testid={`${songName}InfoContainer`}
      >
        <h4 className={styles.songName}>{songName}</h4>
        <h5 className={styles.artistName}>{artistName}</h5>
        {songKey ? (
          <p className={styles.songKey} data-testid={`${songName}SongKey`}>
            {songKey}
          </p>
        ) : null}
        <div className={styles.buttonsContainer}>
          <Button
            onClick={() =>
              deleteSongHandler(songName, artistName, songKey ? songKey : null)
            }
            type="button"
            title="Remove"
          />
          {isEditable ? (
            <LinkButton
              route={
                songKey
                  ? `/bandleader/editSong/${songId}`
                  : `/client/editSong/${songId}`
              }
            >
              Edit
            </LinkButton>
          ) : null}
        </div>
      </div>
    );
  }
);

Song.propTypes = {
  songName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  songKey: PropTypes.string,
  deleteSongHandler: PropTypes.func.isRequired,
};

export default Song;
