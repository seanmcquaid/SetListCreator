import React from "react";
import Button from "./Button";
import { render, fireEvent, screen } from "@testing-library/react";

describe("<Button/>", () => {
    test("Renders Correctly", () => {
        const props = {
            type : "button",
            title : "Test",
            onClick : jest.fn(),
        };

        render(<Button {...props}/>);

        expect(screen.getByTestId("TestButton")).toBeInTheDocument();
    });

    test("On Click works correctly", () => {
        const props = {
            type : "button",
            title : "Test",
            onClick : jest.fn(),
        };
        
        render(<Button {...props}/>);

        fireEvent.click(screen.getByTestId("TestButton"));

        expect(props.onClick).toHaveBeenCalled();
    });
});