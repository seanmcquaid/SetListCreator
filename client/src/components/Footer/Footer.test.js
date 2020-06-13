import React from "react";
import Footer from "./Footer";
import { render, cleanup } from "@testing-library/react";

describe("<Footer/>", () => {

    afterEach(cleanup);
    test("Renders correctly", () => {
        const {getByTestId} = render(<Footer/>);

        expect(getByTestId("footer")).toBeInTheDocument();
    });
});