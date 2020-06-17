import Aux from "./Aux";
import React from "react";
import { render } from "@testing-library/react";

describe("<Aux/>", () => {
    test("Renders children correctly", () => {
        const {getByText} = render(<Aux>Text</Aux>);

        expect(getByText("Text")).toBeInTheDocument();
    });
});