import React from "react";
import styles from "./Button.module.css";
import PropTypes from "prop-types";

const Button = React.memo(({ type, title, onClick }) => (
  <button
    className={styles.button}
    type={type}
    onClick={onClick}
    data-testid={`${title}Button`}
  >
    {title}
  </button>
));

Button.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
