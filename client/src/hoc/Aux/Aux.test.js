import Aux from "./Aux";
import React from "react";
import { render, screen } from "@testing-library/react";

describe("<Aux/>", () => {
    test("Renders children correctly", () => {
        render(<Aux>Text</Aux>);

        expect(screen.getByText("Text")).toBeInTheDocument();
    });
});