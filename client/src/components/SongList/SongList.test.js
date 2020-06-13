import React from "react";
import SongList from "./SongList";
import { render, fireEvent } from "@testing-library/react";

describe("<SongList/>", () => {
    test("Renders correctly with songOnClick", () => {
        const props = {
            list : [{songname : "Song Name Here", artistname : "Artist Name Here", id : 0}],
            songOnClick : jest.fn(),
        };

        const {getByTestId} = render(<SongList {...props}/>);

        expect(getByTestId("songList")).toBeInTheDocument();
        expect(getByTestId("AddButton")).toBeInTheDocument();
    });

    test("Renders correctly without songOnClick", () => {
        const props = {
            list : [{songname : "Song Name Here", artistname : "Artist Name Here", id : 0}],
        };

        const {getByTestId} = render(<SongList {...props}/>);

        expect(getByTestId("songList")).toBeInTheDocument();
        expect(() => getByTestId("AddButton")).toThrowError();
    });

    test("SongonClick works correctly", () => {
        const props = {
            list : [{songname : "Song Name Here", artistname : "Artist Name Here", id : 0}],
            songOnClick : jest.fn(),
        };

        const {getByTestId} = render(<SongList {...props}/>);

        fireEvent.click(getByTestId("AddButton"));

        expect(props.songOnClick).toHaveBeenCalled();
    });
});