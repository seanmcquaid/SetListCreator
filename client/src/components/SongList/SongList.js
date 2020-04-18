import React from "react";
import PropTypes from "prop-types";

const SongList = ({list}) => (
    <ul>
        {list.map(({songname, artistname}) => <li>{songname} - {artistname}</li>)}
    </ul>
);

SongList.propTypes = {
    list : PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default SongList;