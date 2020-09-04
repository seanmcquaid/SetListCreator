import React from "react";
import ClientInfo from "./ClientInfo";
import { render, fireEvent, screen } from "@testing-library/react";

describe("<ClientInfo/>", () => {
  test("Renders correctly", () => {
    const props = {
      clientName: "Test Client",
      clientApproved: null,
      setListAvailable: false,
      clientFinalSetListPageRedirect: jest.fn(),
      clientPageRedirect: jest.fn(),
      clientEditSetListPageRedirect: jest.fn(),
    };

    render(<ClientInfo {...props} />);

    expect(screen.getByTestId("Test ClientInfo")).toBeInTheDocument();
  });

  test("Set List Status - Complete", () => {
    const props = {
      clientName: "Test Client",
      clientApproved: true,
      setListAvailable: true,
      clientFinalSetListPageRedirect: jest.fn(),
      clientPageRedirect: jest.fn(),
      clientEditSetListPageRedirect: jest.fn(),
    };

    render(<ClientInfo {...props} />);

    expect(screen.getByText("Set List Status : Complete")).toBeInTheDocument();
  });

  test("Set List Status - Ready", () => {
    const props = {
      clientName: "Test Client",
      clientApproved: null,
      setListAvailable: true,
      clientFinalSetListPageRedirect: jest.fn(),
      clientPageRedirect: jest.fn(),
      clientEditSetListPageRedirect: jest.fn(),
    };

    render(<ClientInfo {...props} />);

    expect(screen.getByText("Set List Status : Ready")).toBeInTheDocument();
  });

  test("Set List Status - Needs Edits", () => {
    const props = {
      clientName: "Test Client",
      clientApproved: null,
      setListAvailable: false,
      clientFinalSetListPageRedirect: jest.fn(),
      clientPageRedirect: jest.fn(),
      clientEditSetListPageRedirect: jest.fn(),
    };

    render(<ClientInfo {...props} />);

    expect(
      screen.getByText("Set List Status : Needs Edits")
    ).toBeInTheDocument();
  });

  test("Go To Final Set List Page button works", () => {
    const props = {
      clientName: "Test Client",
      clientApproved: true,
      setListAvailable: true,
      clientFinalSetListPageRedirect: jest.fn(),
      clientPageRedirect: jest.fn(),
      clientEditSetListPageRedirect: jest.fn(),
    };

    render(<ClientInfo {...props} />);

    fireEvent.click(screen.getByTestId("Go To Final Set List PageButton"));

    expect(props.clientFinalSetListPageRedirect).toHaveBeenCalled();
  });

  test("Go To Set List Page button works", () => {
    const props = {
      clientName: "Test Client",
      clientApproved: null,
      setListAvailable: true,
      clientFinalSetListPageRedirect: jest.fn(),
      clientPageRedirect: jest.fn(),
      clientEditSetListPageRedirect: jest.fn(),
    };

    render(<ClientInfo {...props} />);

    fireEvent.click(screen.getByTestId("Go To Set List PageButton"));

    expect(props.clientPageRedirect).toHaveBeenCalled();
  });

  test("Go To Edit Set List Page button works", () => {
    const props = {
      clientName: "Test Client",
      clientApproved: null,
      setListAvailable: false,
      clientFinalSetListPageRedirect: jest.fn(),
      clientPageRedirect: jest.fn(),
      clientEditSetListPageRedirect: jest.fn(),
    };

    render(<ClientInfo {...props} />);

    fireEvent.click(screen.getByTestId("Go To Edit Set List PageButton"));

    expect(props.clientEditSetListPageRedirect).toHaveBeenCalled();
  });
});
