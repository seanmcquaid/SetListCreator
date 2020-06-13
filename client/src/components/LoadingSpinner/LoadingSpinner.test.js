import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import { render, cleanup } from "@testing-library/react";

describe("<LoadingSpinner/>", () => {

    afterEach(cleanup);
    test("Renders correctly when loading", () => {
        const props = {
            isLoading : true,
        };

        const {getByTestId} = render(<LoadingSpinner {...props}/>);

        expect(getByTestId("loadingSpinner")).toBeInTheDocument();
    });

    test("Renders correctly when not loading", () => {
        const props = {
            isLoading : false,
        };

        const {getByTestId} = render(<LoadingSpinner {...props}/>);

        expect(getByTestId("loadingSpinner").innerHTML).toBe("");
    });
});