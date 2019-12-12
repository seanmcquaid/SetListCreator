import React from "react";
import styles from "./Dropdown.module.css";

const Dropdown = props => {
    const {selectedItem, selectedItemOnChangeHandler, items, name, title} = props;
    return (
        <div className={styles.dropDownContainer}>
            <label htmlFor={name} className={styles.dropdownLabel}>{title}</label>
            <select name={name} value={selectedItem} onChange={selectedItemOnChangeHandler} className={styles.selectDropDown}>
                {items.map((item, i) => <option key={i} value={item}>{item}</option>)}
            </select>
        </div>
    )
};

export default Dropdown;