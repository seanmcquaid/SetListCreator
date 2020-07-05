import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import { render, screen } from "@testing-library/react";

describe("<LoadingSpinner/>", () => {
    test("Renders correctly when loading", () => {
        const props = {
            isLoading : true,
        };

        render(<LoadingSpinner {...props}/>);

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();
    });

    test("Renders correctly when not loading", () => {
        const props = {
            isLoading : false,
        };

        render(<LoadingSpinner {...props}/>);

        expect(screen.getByTestId("loadingSpinner").innerHTML).toBe("");
    });
});