import React from "react";
import BandleaderLoginPage from "./BandleaderLoginPage";
import axios from "axios";
import configureStore from "store/configureStore";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import MockRouter from "testUtils/MockRouter";
import { Route } from "react-router-dom";
import BandleaderHomePage from "../BandleaderHomePage/BandleaderHomePage";
import BandleaderRegisterPage from "../BandleaderRegisterPage/BandleaderRegisterPage";

describe("<BandleaderLoginPage/>", () => {
  test("Register Button takes you to the Bandleader Register Page", async () => {
    const store = configureStore();

    render(
      <Provider store={store}>
        <MockRouter initialRoute="/bandleaderLogin">
          <Route
            exact
            path="/bandleaderLogin"
            component={BandleaderLoginPage}
          />
          <Route
            exact
            path="/bandleaderRegister"
            component={BandleaderRegisterPage}
          />
        </MockRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Here"));

    await waitFor(() =>
      expect(screen.getByText("Band Leader Register")).toBeInTheDocument()
    );
  });

  test("Successful Login redirects user to bandleader home", async () => {
    const store = configureStore();

    render(
      <Provider store={store}>
        <MockRouter initialRoute="/bandleaderLogin">
          <Route
            exact
            path="/bandleaderLogin"
            component={BandleaderLoginPage}
          />
          <Route exact path="/bandleaderHome" component={BandleaderHomePage} />
        </MockRouter>
      </Provider>
    );

    fireEvent.change(screen.getByTestId("UsernameTextInput"), {
      target: { value: "testuser" },
    });
    expect(screen.getByTestId("UsernameTextInput").value).toEqual("testuser");

    fireEvent.change(screen.getByTestId("PasswordTextInput"), {
      target: { value: "testpassword" },
    });
    expect(screen.getByTestId("PasswordTextInput").value).toEqual(
      "testpassword"
    );

    const loginActionResponse = {
      isAuthenticated: true,
      token: "test token",
      username: "testuser",
      accountType: "bandleader",
    };

    jest
      .spyOn(axios, "post")
      .mockResolvedValueOnce({ data: { ...loginActionResponse } });

    fireEvent.click(screen.getByTestId("LoginButton"));

    await waitFor(() =>
      expect(screen.getByText("Band Leader Home Page")).toBeInTheDocument()
    );
  });

  test("Unsuccessful login - Error Message Appears", async () => {
    const store = configureStore();

    render(
      <Provider store={store}>
        <MockRouter initialRoute="/bandleaderLogin">
          <Route
            exact
            path="/bandleaderLogin"
            component={BandleaderLoginPage}
          />
          <Route exact path="/bandleaderHome" component={BandleaderHomePage} />
        </MockRouter>
      </Provider>
    );

    fireEvent.change(screen.getByTestId("UsernameTextInput"), {
      target: { value: "testuser" },
    });
    expect(screen.getByTestId("UsernameTextInput").value).toEqual("testuser");

    fireEvent.change(screen.getByTestId("PasswordTextInput"), {
      target: { value: "testpassword" },
    });
    expect(screen.getByTestId("PasswordTextInput").value).toEqual(
      "testpassword"
    );

    const loginActionResponse = {
      errorMessage: "Error Here",
    };

    jest.spyOn(axios, "post").mockRejectedValueOnce({
      response: {
        data: {
          ...loginActionResponse,
        },
      },
    });

    fireEvent.click(screen.getByTestId("LoginButton"));

    await waitFor(() =>
      expect(screen.getByText("Error Here")).toBeInTheDocument()
    );
  });
});
