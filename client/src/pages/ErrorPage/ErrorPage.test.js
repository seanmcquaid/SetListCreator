import React from "react";
import ErrorPage from "./ErrorPage";
import { render, screen } from "@testing-library/react";

describe("<ErrorPage/>", () => {
    test("Renders correctly", () => {
        render(<ErrorPage/>);

        expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    });
});