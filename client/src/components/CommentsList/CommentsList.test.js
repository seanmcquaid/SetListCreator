import React from "react";
import CommentsList from "./CommentsList";
import { render } from "@testing-library/react";

describe("<CommentsList/>", () => {
    test("Renders correctly", () => {
        const props = {
            list : ["Comments", "Here"],
        };

        const {getByTestId} = render(<CommentsList {...props}/>);

        expect(getByTestId("commentsList")).toBeInTheDocument();
    });
});