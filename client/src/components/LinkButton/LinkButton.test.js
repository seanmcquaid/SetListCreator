import React from "react";
import LinkButton from "./LinkButton";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter as Router} from "react-router-dom";

describe("<LinkButton/>", () => {

    afterEach(cleanup);
    test("Renders correctly", () => {
        const props = {
            route : "/",
            children : "Link Button Name"
        };

        const {getByText} = render(
            <Router>
                <LinkButton {...props}/>
            </Router>
        );

        expect(getByText("Link Button Name")).toBeInTheDocument();        
    });
});