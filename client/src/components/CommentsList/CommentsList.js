import React from "react";
import styles from "./CommentsList.module.css";
import PropTypes from "prop-types";

const CommentsList = React.memo(({ list }) => (
  <ul className={styles.commentsList} data-testid="commentsList">
    {list.map((listItem, i) => (
      <li key={i} className={styles.commentListItem}>
        {listItem}
      </li>
    ))}
  </ul>
));

CommentsList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default CommentsList;
