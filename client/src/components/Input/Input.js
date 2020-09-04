import React from "react";
import styles from "./Input.module.css";
import PropTypes from "prop-types";

const Input = React.memo(
  ({ name, title, type, value, onChangeHandler, placeholder }) => (
    <div
      className={styles.inputContainer}
      data-testid={`${title}TextInputContainer`}
    >
      <label htmlFor={name} className={styles.inputLabel}>
        {title}
      </label>
      <input
        className={styles.input}
        name={name}
        type={type}
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
        data-testid={`${title}TextInput`}
      />
    </div>
  )
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
