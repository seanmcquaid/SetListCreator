import React from "react";
import PropTypes from "prop-types";
import styles from "./SongList.module.css";
import Button from "components/Button/Button";

const SongList = ({list, songOnClick}) => (
    <ul className={styles.songList}>
        {list.map(songInfo => {
            const {songname, artistname, id} = songInfo;
            return <li className={styles.songListItem} key={id}>{songname} - {artistname} {songOnClick ?  <Button title="Add" onClick={ () => songOnClick(songInfo)} type="button"/> : null}</li>
            })
        }
    </ul>
);

SongList.propTypes = {
    list : PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

SongList.defaultProps = {
    list : [{songname : "Song Name Here", artistname : "Artist Name Here", id : 0}]
};

export default SongList;