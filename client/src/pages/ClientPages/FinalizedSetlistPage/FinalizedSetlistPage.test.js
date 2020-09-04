import React from "react";
import FinalizedSetListPage from "./FinalizedSetListPage";
import axios from "axios";
import configureStore from "store/configureStore";
import { Provider } from "react-redux";
import MockRouter from "testUtils/MockRouter";
import { Route } from "react-router-dom";
import { screen, waitFor, render } from "@testing-library/react";

describe("<FinalizedSetListPage/>", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  test("Loading Spinner", async () => {
    const getCompletedSetlistResponse = {
      bandleaderComments: ["Band Leader Comments Here"],
      suggestedSetList: [
        {
          songname: "Uptown Funk",
          artistname: "Bruno Mars",
          id: 1,
        },
      ],
    };

    jest
      .spyOn(axios, "get")
      .mockResolvedValueOnce({ data: { ...getCompletedSetlistResponse } });

    const store = configureStore();

    render(
      <Provider store={store}>
        <MockRouter initialRoute="/client/finalizedSetList">
          <Route
            exact
            path="/client/finalizedSetList"
            component={FinalizedSetListPage}
          />
        </MockRouter>
      </Provider>
    );

    expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByTestId("loadingSpinner")).toBeNull()
    );
  });

  test("Error Message", async () => {
    const getCompletedSetlistResponse = {
      errorMessage: "ERROR",
    };

    jest.spyOn(axios, "get").mockRejectedValueOnce({
      response: {
        data: {
          ...getCompletedSetlistResponse,
        },
      },
    });

    const store = configureStore();

    render(
      <Provider store={store}>
        <MockRouter initialRoute="/client/finalizedSetList">
          <Route
            exact
            path="/client/finalizedSetList"
            component={FinalizedSetListPage}
          />
        </MockRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.queryByTestId("loadingSpinner")).toBeNull()
    );

    expect(screen.getByText("ERROR")).toBeInTheDocument();
  });

  test("Set List info loads correctly", async () => {
    const getCompletedSetlistResponse = {
      bandleaderComments: ["Band Leader Comments Here"],
      suggestedSetList: [
        {
          songname: "Uptown Funk",
          artistname: "Bruno Mars",
          id: 1,
        },
      ],
    };

    jest
      .spyOn(axios, "get")
      .mockResolvedValueOnce({ data: { ...getCompletedSetlistResponse } });

    const store = configureStore();

    render(
      <Provider store={store}>
        <MockRouter initialRoute="/client/finalizedSetList">
          <Route
            exact
            path="/client/finalizedSetList"
            component={FinalizedSetListPage}
          />
        </MockRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.queryByTestId("loadingSpinner")).toBeNull()
    );

    expect(screen.getByText("Uptown Funk - Bruno Mars")).toBeInTheDocument();
  });
});
