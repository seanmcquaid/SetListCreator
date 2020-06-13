import React from "react";
import ClientInfo from "./ClientInfo";
import { render, fireEvent, cleanup } from "@testing-library/react";

describe("<ClientInfo/>", () => {

    afterEach(cleanup);
    test("Renders correctly", () => {
        const props = {
            clientName : "Test Client", 
            clientApproved : null, 
            setListAvailable : false, 
            clientFinalSetListPageRedirect : jest.fn(), 
            clientPageRedirect : jest.fn(),
            clientEditSetListPageRedirect : jest.fn(),
        };

        const {getByTestId} = render(<ClientInfo {...props}/>);

        expect(getByTestId("Test ClientInfo")).toBeInTheDocument();
    });

    test("Set List Status - Complete", () => {
        const props = {
            clientName : "Test Client", 
            clientApproved : true, 
            setListAvailable : true, 
            clientFinalSetListPageRedirect : jest.fn(), 
            clientPageRedirect : jest.fn(),
            clientEditSetListPageRedirect : jest.fn(),
        };

        const {getByText} = render(<ClientInfo {...props}/>);

        expect(getByText("Set List Status : Complete")).toBeInTheDocument();
    });

    test("Set List Status - Ready", () => {
        const props = {
            clientName : "Test Client", 
            clientApproved : null, 
            setListAvailable : true, 
            clientFinalSetListPageRedirect : jest.fn(), 
            clientPageRedirect : jest.fn(),
            clientEditSetListPageRedirect : jest.fn(),
        };

        const {getByText} = render(<ClientInfo {...props}/>);

        expect(getByText("Set List Status : Ready")).toBeInTheDocument();
    });

    test("Set List Status - Needs Edits", () => {
        const props = {
            clientName : "Test Client", 
            clientApproved : null, 
            setListAvailable : false, 
            clientFinalSetListPageRedirect : jest.fn(), 
            clientPageRedirect : jest.fn(),
            clientEditSetListPageRedirect : jest.fn(),
        };

        const {getByText} = render(<ClientInfo {...props}/>);

        expect(getByText("Set List Status : Needs Edits")).toBeInTheDocument();
    });

    test("Go To Final Set List Page button works", () => {
        const props = {
            clientName : "Test Client", 
            clientApproved : true, 
            setListAvailable : true, 
            clientFinalSetListPageRedirect : jest.fn(), 
            clientPageRedirect : jest.fn(),
            clientEditSetListPageRedirect : jest.fn(),
        };

        const {getByTestId} = render(<ClientInfo {...props}/>);

        fireEvent.click(getByTestId("Go To Final Set List PageButton"));

        expect(props.clientFinalSetListPageRedirect).toHaveBeenCalled();
    });

    test("Go To Set List Page button works", () => {
        const props = {
            clientName : "Test Client", 
            clientApproved : null, 
            setListAvailable : true, 
            clientFinalSetListPageRedirect : jest.fn(), 
            clientPageRedirect : jest.fn(),
            clientEditSetListPageRedirect : jest.fn(),
        };

        const {getByTestId} = render(<ClientInfo {...props}/>);

        fireEvent.click(getByTestId("Go To Set List PageButton"));

        expect(props.clientPageRedirect).toHaveBeenCalled();
    });

    test("Go To Edit Set List Page button works", () => {
        const props = {
            clientName : "Test Client", 
            clientApproved : null, 
            setListAvailable : false, 
            clientFinalSetListPageRedirect : jest.fn(), 
            clientPageRedirect : jest.fn(),
            clientEditSetListPageRedirect : jest.fn(),
        };

        const {getByTestId} = render(<ClientInfo {...props}/>);

        fireEvent.click(getByTestId("Go To Edit Set List PageButton"));

        expect(props.clientEditSetListPageRedirect).toHaveBeenCalled();
    });
    
});