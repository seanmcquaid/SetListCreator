import React from "react";
import styles from "./Dropdown.module.css";
import PropTypes from "prop-types";

const Dropdown = ({
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
};

Dropdown.propTypes = {
    selectedItem : PropTypes.string.isRequired,
    selectedItemOnChangeHandler  : PropTypes.func.isRequired,
    items : PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    name : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
};

Dropdown.defaultProps = {
    selectedItem : "Selected Item",
    selectedItemOnChangeHandler  : () => console.log("Selected Item On Change Handler"),
    items : ["Items", "Here"],
    name : "Dropdown Name",
    title : "Dropdown Title"
};

export default Dropdown;