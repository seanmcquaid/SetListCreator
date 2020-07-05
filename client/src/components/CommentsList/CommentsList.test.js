import React from "react";
import CommentsList from "./CommentsList";
import { render, screen } from "@testing-library/react";

describe("<CommentsList/>", () => {

    test("Renders correctly", () => {
        const props = {
            list : ["Comments", "Here"],
        };

        render(<CommentsList {...props}/>);

        expect(screen.getByTestId("commentsList")).toBeInTheDocument();
    });
});