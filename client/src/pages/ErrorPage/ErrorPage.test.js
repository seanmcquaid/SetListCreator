import React from "react";
import ErrorPage from "./ErrorPage";
import { render } from "@testing-library/react";

describe("<ErrorPage/>", () => {
    test("Renders correctly", () => {
        const {getByText} = render(<ErrorPage/>);

        expect(getByText("Page Not Found")).toBeInTheDocument();
    });
});