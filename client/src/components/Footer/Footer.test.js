import React from "react";
import Footer from "./Footer";
import { render } from "@testing-library/react";

describe("<Footer/>", () => {
    test("Renders correctly", () => {
        const {getByTestId} = render(<Footer/>);

        expect(getByTestId("footer")).toBeInTheDocument();
    });
});