import React from "react";
import SongList from "./SongList";
import { render, fireEvent, screen } from "@testing-library/react";

describe("<SongList/>", () => {
    test("Renders correctly with songOnClick", () => {
        const props = {
            list : [{songname : "Song Name Here", artistname : "Artist Name Here", id : 0}],
            songOnClick : jest.fn(),
        };

        render(<SongList {...props}/>);

        expect(screen.getByTestId("songList")).toBeInTheDocument();
        expect(screen.getByTestId("AddButton")).toBeInTheDocument();
    });

    test("Renders correctly without songOnClick", () => {
        const props = {
            list : [{songname : "Song Name Here", artistname : "Artist Name Here", id : 0}],
        };

        render(<SongList {...props}/>);

        expect(screen.getByTestId("songList")).toBeInTheDocument();
        expect(() => screen.getByTestId("AddButton")).toThrowError();
    });

    test("SongonClick works correctly", () => {
        const props = {
            list : [{songname : "Song Name Here", artistname : "Artist Name Here", id : 0}],
            songOnClick : jest.fn(),
        };

        render(<SongList {...props}/>);

        fireEvent.click(screen.getByTestId("AddButton"));

        expect(props.songOnClick).toHaveBeenCalled();
    });
});