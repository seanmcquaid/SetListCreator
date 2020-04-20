import React from "react";
import PropTypes from "prop-types";
import styles from "./SongList.module.css";

const SongList = ({list}) => (
    <ul className={styles.songList}>
        {list.map(({songname, artistname, id}) => <li className={styles.songListItem} key={id}>{songname} - {artistname}</li>)}
    </ul>
);

SongList.propTypes = {
    list : PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default SongList;