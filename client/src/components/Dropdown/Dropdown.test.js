import React from "react";
import Dropdown from "./Dropdown";
import { render, fireEvent, screen } from "@testing-library/react";

describe("<Dropdown/>", () => {

    test("Renders correctly", () => {
        const props = {
            selectedItem : "Selected Item",
            selectedItemOnChangeHandler  : jest.fn(),
            items : ["Items", "are", "here"],
            name : "Test Dropdown",
            title : "Test",
        };

        render(<Dropdown {...props}/>);

        expect(screen.getByTestId("TestDropdown")).toBeInTheDocument();
    });

    test("OnChange works as expected", () => {
        const props = {
            selectedItem : "Selected Item",
            selectedItemOnChangeHandler  : jest.fn(),
            items : ["Items", "are", "here"],
            name : "Test Dropdown",
            title : "Test",
        };

        render(<Dropdown {...props}/>);

        fireEvent.change(screen.getByTestId("TestDropdown", {target : {value : "Here"}}));

        expect(props.selectedItemOnChangeHandler).toBeCalled();
    });
});