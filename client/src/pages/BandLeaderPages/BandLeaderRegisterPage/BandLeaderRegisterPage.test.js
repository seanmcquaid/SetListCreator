import React from "react";
import BandleaderRegisterPage from "./BandleaderRegisterPage";
import configureStore from "store/configureStore";
import MockRouter from "testUtils/MockRouter";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import BandleaderHomePage from "../BandleaderHomePage/BandleaderHomePage";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import BandleaderLoginPage from "../BandleaderLoginPage/BandleaderLoginPage";

describe("<BandleaderRegisterPage/>", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("Login Button takes you to the Bandleader Login Page", async () => {
    const store = configureStore();

    render(
      <Provider store={store}>
        <MockRouter initialRoute="/bandleaderRegister">
          <Route
            exact
            path="/bandleaderRegister"
            component={BandleaderRegisterPage}
          />
          <Route
            exact
            path="/bandleaderLogin"
            component={BandleaderLoginPage}
          />
        </MockRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Here"));

    await waitFor(() =>
      expect(screen.getByText("Band Leader Login")).toBeInTheDocument()
    );
  });

  test("Successful register redirects user to bandleader home", async () => {
    const store = configureStore();

    render(
      <Provider store={store}>
        <MockRouter initialRoute="/bandleaderRegister">
          <Route
            exact
            path="/bandleaderRegister"
            component={BandleaderRegisterPage}
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

    fireEvent.change(screen.getByTestId("Confirm PasswordTextInput"), {
      target: { value: "testpassword" },
    });
    expect(screen.getByTestId("Confirm PasswordTextInput").value).toEqual(
      "testpassword"
    );

    const registerActionResponse = {
      isAuthenticated: true,
      token: "test token",
      username: "testuser",
      accountType: "bandleader",
    };

    jest
      .spyOn(axios, "post")
      .mockResolvedValueOnce({ data: { ...registerActionResponse } });

    fireEvent.click(screen.getByTestId("RegisterButton"));

    await waitFor(() =>
      expect(screen.getByText("Band Leader Home Page")).toBeInTheDocument()
    );
  });

  describe("Unsucessfully register user", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });
    test("Passwords don't match", async () => {
      const store = configureStore();

      render(
        <Provider store={store}>
          <MockRouter initialRoute="/bandleaderRegister">
            <Route
              exact
              path="/bandleaderRegister"
              component={BandleaderRegisterPage}
            />
            <Route
              exact
              path="/bandleaderHome"
              component={BandleaderHomePage}
            />
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

      fireEvent.change(screen.getByTestId("Confirm PasswordTextInput"), {
        target: { value: "testpassword123" },
      });
      expect(screen.getByTestId("Confirm PasswordTextInput").value).toEqual(
        "testpassword123"
      );

      fireEvent.click(screen.getByTestId("RegisterButton"));

      await waitFor(() =>
        expect(screen.getByText("Passwords don't match")).toBeInTheDocument()
      );
    });

    test("User already is registered - error message displays", async () => {
      const store = configureStore();

      render(
        <Provider store={store}>
          <MockRouter initialRoute="/bandleaderRegister">
            <Route
              exact
              path="/bandleaderRegister"
              component={BandleaderRegisterPage}
            />
            <Route
              exact
              path="/bandleaderHome"
              component={BandleaderHomePage}
            />
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

      fireEvent.change(screen.getByTestId("Confirm PasswordTextInput"), {
        target: { value: "testpassword" },
      });
      expect(screen.getByTestId("Confirm PasswordTextInput").value).toEqual(
        "testpassword"
      );

      const registerActionResponse = {
        errorMessage: "Error Here",
      };

      jest.spyOn(axios, "post").mockRejectedValueOnce({
        response: {
          data: {
            ...registerActionResponse,
          },
        },
      });

      fireEvent.click(screen.getByTestId("RegisterButton"));

      await waitFor(() =>
        expect(screen.getByText("Error Here")).toBeInTheDocument()
      );
    });
  });
});
