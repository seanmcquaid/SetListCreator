import React from "react";
import styles from "./Dropdown.module.css";
import PropTypes from "prop-types";

const Dropdown = React.memo(({
    selectedItem, 
    selectedItemOnChangeHandler, 
    items, 
    name, 
    title
}) => {
    return (
        <div className={styles.dropDownContainer}>
            <label htmlFor={name} className={styles.dropdownLabel}>{title}</label>
            <select name={name} value={selectedItem} onChange={selectedItemOnChangeHandler} className={styles.selectDropDown}>
                {items.map((item, i) => <option key={i} value={item}>{item}</option>)}
            </select>
        </div>
    )
});

Dropdown.propTypes = {
    selectedItem : PropTypes.string.isRequired,
    selectedItemOnChangeHandler  : PropTypes.func.isRequired,
    items : PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    name : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
};

export default Dropdown;