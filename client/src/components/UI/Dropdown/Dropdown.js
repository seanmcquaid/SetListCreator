import React from "react";

const Dropdown = props => {
    const {selectedItem, selectedItemOnChangeHandler, items} = props;
    console.log(props);
    return (
        <select value={selectedItem} onChange={selectedItemOnChangeHandler}>
            {items.map((item, i) => <option key={i} value={item}>{item}</option>)}
        </select>
    )
};

export default Dropdown;