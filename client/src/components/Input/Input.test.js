import React from "react";
import Input from "./Input";
import { render, fireEvent, screen } from "@testing-library/react";

describe("<Input/>", () => {
  test("Renders correctly", () => {
    const props = {
      name: "Input Name",
      title: "Input Title",
      type: "Input Type",
      value: "Input Value",
      onChangeHandler: jest.fn(),
      placeholder: "Input Placeholder",
    };

    render(<Input {...props} />);

    expect(
      screen.getByTestId("Input TitleTextInputContainer")
    ).toBeInTheDocument();
  });

  test("OnChange works correctly", () => {
    const props = {
      name: "Input Name",
      title: "Input Title",
      type: "Input Type",
      value: "Input Value",
      onChangeHandler: jest.fn(),
      placeholder: "Input Placeholder",
    };

    render(<Input {...props} />);

    fireEvent.change(screen.getByTestId("Input TitleTextInput"), {
      target: { value: "Value" },
    });

    expect(props.onChangeHandler).toHaveBeenCalled();
  });
});
