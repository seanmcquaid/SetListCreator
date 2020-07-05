import React from "react";
import Text from "./Text";
import { render, screen } from "@testing-library/react";

describe("<Text/>", () => {
    test("Renders correctly with header text", () => {
        const props = {
            headerText : true,
            children : "Text Here",
        };

        render(<Text {...props}/>);

        expect(screen.getByTestId("headerText")).toBeInTheDocument();
    });

    test("Renders correctly with paragraph text", () => {
        const props = {
            children : "Text Here",
        };

        render(<Text {...props}/>);

        expect(screen.getByTestId("paragraphText")).toBeInTheDocument();
    });
});