import React from "react";
import Input from "./Input";
import { render, fireEvent } from "@testing-library/react";

describe("<Input/>", () => {
    test("Renders correctly", () => {
        const props = {
            name : "Input Name",
            title : "Input Title",
            type : "Input Type",
            value : "Input Value",
            onChangeHandler : jest.fn(),
            placeholder : "Input Placeholder"
        };

        const {getByTestId} = render(<Input {...props}/>);

        expect(getByTestId("Input TitleTextInputContainer")).toBeInTheDocument();
    });

    test("OnChange works correctly", () => {
        const props = {
            name : "Input Name",
            title : "Input Title",
            type : "Input Type",
            value : "Input Value",
            onChangeHandler : jest.fn(),
            placeholder : "Input Placeholder"
        };

        const {getByTestId} = render(<Input {...props}/>);

        fireEvent.change(getByTestId("Input TitleTextInput"), {target : { value : "Value"}});

        expect(props.onChangeHandler).toHaveBeenCalled();
    });
});