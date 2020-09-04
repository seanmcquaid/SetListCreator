import React from "react";
import styles from "./Dropdown.module.css";
import PropTypes from "prop-types";

const Dropdown = React.memo(
  ({ selectedItem, selectedItemOnChangeHandler, items, name, title }) => (
    <div
      className={styles.dropDownContainer}
      data-testid={`${title}DropdownContainer`}
    >
      <label htmlFor={name} className={styles.dropdownLabel}>
        {title}
      </label>
      <select
        name={name}
        value={selectedItem}
        onChange={selectedItemOnChangeHandler}
        className={styles.selectDropDown}
        data-testid={`${title}Dropdown`}
      >
        {items.map((item, i) => (
          <option key={i} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
);

Dropdown.propTypes = {
  selectedItem: PropTypes.string.isRequired,
  selectedItemOnChangeHandler: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Dropdown;
