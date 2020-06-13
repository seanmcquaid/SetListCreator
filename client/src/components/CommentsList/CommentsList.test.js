import React from "react";
import CommentsList from "./CommentsList";
import { render, cleanup } from "@testing-library/react";

describe("<CommentsList/>", () => {

    afterEach(cleanup);
    test("Renders correctly", () => {
        const props = {
            list : ["Comments", "Here"],
        };

        const {getByTestId} = render(<CommentsList {...props}/>);

        expect(getByTestId("commentsList")).toBeInTheDocument();
    });
});