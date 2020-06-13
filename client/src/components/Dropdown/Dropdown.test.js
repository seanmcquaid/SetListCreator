import React from "react";
import Dropdown from "./Dropdown";
import { render, fireEvent, cleanup } from "@testing-library/react";

describe("<Dropdown/>", () => {

    afterEach(cleanup);
    test("Renders correctly", () => {
        const props = {
            selectedItem : "Selected Item",
            selectedItemOnChangeHandler  : jest.fn(),
            items : ["Items", "are", "here"],
            name : "Test Dropdown",
            title : "Test",
        };

        const {getByTestId} = render(<Dropdown {...props}/>);

        expect(getByTestId("TestDropdown")).toBeInTheDocument();
    });

    test("OnChange works as expected", () => {
        const props = {
            selectedItem : "Selected Item",
            selectedItemOnChangeHandler  : jest.fn(),
            items : ["Items", "are", "here"],
            name : "Test Dropdown",
            title : "Test",
        };

        const {getByTestId} = render(<Dropdown {...props}/>);

        fireEvent.change(getByTestId("TestDropdown", {target : {value : "Here"}}));

        expect(props.selectedItemOnChangeHandler).toBeCalled();
    });
});