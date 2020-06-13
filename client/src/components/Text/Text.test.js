import React from "react";
import Text from "./Text";
import { render } from "@testing-library/react";

describe("<Text/>", () => {
    test("Renders correctly with header text", () => {
        const props = {
            headerText : true,
            children : "Text Here",
        };

        const {getByTestId} = render(<Text {...props}/>);

        expect(getByTestId("headerText")).toBeInTheDocument();
    });

    test("Renders correctly with paragraph text", () => {
        const props = {
            children : "Text Here",
        };

        const {getByTestId} = render(<Text {...props}/>);

        expect(getByTestId("paragraphText")).toBeInTheDocument();
    });
});