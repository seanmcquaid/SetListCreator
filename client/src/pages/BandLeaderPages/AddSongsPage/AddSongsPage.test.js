import React from "react";
import configureStore from "store/configureStore";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Route } from "react-router-dom";
import { Provider } from "react-redux";
import MockRouter from "testUtils/MockRouter";
import AddSongsPage from "./AddSongsPage";
import axios from "axios";

describe("Add Songs Page", () => {
  test("Songs previously added load", async () => {
    const getBandleaderSongsActionResponse = {
      songList: [
        {
          songname: "Uptown Funk",
          artistname: "Bruno Mars",
          songkey: "D Minor",
          id: 1,
        },
      ],
    };

    jest
      .spyOn(axios, "get")
      .mockResolvedValueOnce({ data: { ...getBandleaderSongsActionResponse } });

    const store = configureStore();

    render(
      <Provider store={store}>
        <MockRouter initialRoute="/bandleader/addSongs">
          <Route exact path="/bandleader/addSongs" component={AddSongsPage} />
        </MockRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.getByText("Uptown Funk")).toBeInTheDocument()
    );
  });

  test("Added song displays and text inputs reset", async () => {
    const getBandleaderSongsActionResponse = {
      songList: [
        {
          songname: "Uptown Funk",
          artistname: "Bruno Mars",
          songkey: "D Minor",
          id: 1,
        },
      ],
    };

    jest
      .spyOn(axios, "get")
      .mockResolvedValueOnce({ data: { ...getBandleaderSongsActionResponse } });

    const store = configureStore();

    render(
      <Provider store={store}>
        <MockRouter initialRoute="/bandleader/addSongs">
          <Route exact path="/bandleader/addSongs" component={AddSongsPage} />
        </MockRouter>
      </Provider>
    );

    fireEvent.change(screen.getByTestId("Song NameTextInput"), {
      target: { value: "Treasure" },
    });
    expect(screen.getByTestId("Song NameTextInput").value).toEqual("Treasure");

    fireEvent.change(screen.getByTestId("Artist NameTextInput"), {
      target: { value: "Bruno Mars" },
    });
    expect(screen.getByTestId("Artist NameTextInput").value).toEqual(
      "Bruno Mars"
    );

    fireEvent.change(screen.getByTestId("KeyTextInput"), {
      target: { value: "F Major" },
    });
    expect(screen.getByTestId("KeyTextInput").value).toEqual("F Major");

    const addBandleaderSongActionResponse = {
      songList: [
        {
          songname: "Uptown Funk",
          artistname: "Bruno Mars",
          songkey: "D Minor",
          id: 1,
        },
        {
          songname: "Treasure",
          artistname: "Bruno Mars",
          songkey: "F Major",
          id: 1,
        },
      ],
    };

    jest
      .spyOn(axios, "post")
      .mockResolvedValueOnce({ data: { ...addBandleaderSongActionResponse } });

    fireEvent.click(screen.getByTestId("Add SongButton"));

    await waitFor(() =>
      expect(screen.getByText("Treasure")).toBeInTheDocument()
    );

    expect(screen.getByTestId("Song NameTextInput").value).toEqual("");

    expect(screen.getByTestId("Artist NameTextInput").value).toEqual("");

    expect(screen.getByTestId("KeyTextInput").value).toEqual("");
  });

  test("Deleted song is no longer displayed", async () => {
    const getBandleaderSongsActionResponse = {
      songList: [
        {
          songname: "Uptown Funk",
          artistname: "Bruno Mars",
          songkey: "D Minor",
          id: 1,
        },
      ],
    };

    jest
      .spyOn(axios, "get")
      .mockResolvedValueOnce({ data: { ...getBandleaderSongsActionResponse } });

    const store = configureStore();

    render(
      <Provider store={store}>
        <MockRouter initialRoute="/bandleader/addSongs">
          <Route exact path="/bandleader/addSongs" component={AddSongsPage} />
        </MockRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.getByText("Uptown Funk")).toBeInTheDocument()
    );

    const deleteBandleaderSongActionResponse = {
      songList: [],
    };

    jest.spyOn(axios, "delete").mockResolvedValueOnce({
      data: { ...deleteBandleaderSongActionResponse },
    });

    fireEvent.click(screen.getByTestId("RemoveButton"));

    await waitFor(() => expect(screen.queryByText("Uptown Funk")).toBeNull());
  });
});
