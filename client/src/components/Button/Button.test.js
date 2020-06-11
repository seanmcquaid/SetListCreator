import React from "react";
import Button from "./Button";
import { render, fireEvent } from "@testing-library/react";

describe("<Button/>", () => {
    test("Renders Correctly", () => {
        const props = {
            type : "button",
            title : "Test",
            onClick : jest.fn(),
        };
        const {getByTestId} = render(<Button {...props}/>);

        expect(getByTestId("TestButton")).toBeInTheDocument();
    });

    test("On Click works correctly", () => {
        const props = {
            type : "button",
            title : "Test",
            onClick : jest.fn(),
        };
        const {getByTestId} = render(<Button {...props}/>);

        fireEvent.click(getByTestId("TestButton"));

        expect(props.onClick).toHaveBeenCalled();
    });
});