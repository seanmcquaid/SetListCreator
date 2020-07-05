import React from "react";
import Footer from "./Footer";
import { render, screen } from "@testing-library/react";

describe("<Footer/>", () => {
    test("Renders correctly", () => {
        render(<Footer/>);

        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });
});