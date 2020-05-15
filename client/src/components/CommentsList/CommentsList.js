import React from "react";
import styles from "./CommentsList.module.css";
import PropTypes from "prop-types";

const CommentsList = ({list}) => (
    <ul className={styles.commentsList}>
        {list.map((listItem, i) => <li key={i} className={styles.commentListItem}>{listItem}</li>)}
    </ul>
);

CommentsList.propTypes = {
    list : PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

CommentsList.defaultProps = {
    list : ["Comments", "List", "Here"]
}

export default CommentsList;