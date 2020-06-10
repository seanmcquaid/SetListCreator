import React from "react";
import ClientProfilePage from "./ClientProfilePage";
import { waitFor, act } from "@testing-library/react";
import {Router} from "react-router-dom";
import {render} from "testUtils/testUtils";
import { createMemoryHistory } from "history";

describe("<ClientProfilePage/>", () => {
    test("Loading Spinner", async () => {
        jest.useFakeTimers();

        const history = createMemoryHistory();

        const {getByTestId} = render(<Router history={history}><ClientProfilePage/></Router>);

        expect(getByTestId("loadingSpinner")).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(1500);
        });

        expect(() => getByTestId("loadingSpinner")).toThrowError();
    });
});