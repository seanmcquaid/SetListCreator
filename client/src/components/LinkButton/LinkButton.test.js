import React from "react";
import LinkButton from "./LinkButton";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

describe("<LinkButton/>", () => {
  test("Renders correctly", () => {
    const props = {
      route: "/",
      children: "Link Button Name",
    };

    render(
      <Router>
        <LinkButton {...props} />
      </Router>
    );

    expect(screen.getByText("Link Button Name")).toBeInTheDocument();
  });
});
