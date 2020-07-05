import React from "react";
import Song from "./Song";
import { render, fireEvent, screen } from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";

describe("<Song/>", () => {

    test("Renders correctly when songKey is provided", () => {
        const props = {
            songName : "Song Name Here",
            artistName : "Artist Name Here",
            songKey : "Song Key Here",
            deleteSongHandler : jest.fn(),
        };
        
        render(<Song {...props}/>);

        expect(screen.getByTestId("Song Name HereSongKey")).toBeInTheDocument();
    });

    test("Renders correctly when songKey isn't provided", () => {
        const props = {
            songName : "Song Name Here",
            artistName : "Artist Name Here",
            deleteSongHandler : jest.fn(),
        };
        
        render(<Song {...props}/>);

        expect(() => screen.getByTestId("Song Name HereSongKey")).toThrowError();
    });

    test("Edit button displays when editable", () => {
        const props = {
            songName : "Song Name Here",
            artistName : "Artist Name Here",
            songKey : "Song Key Here",
            deleteSongHandler : jest.fn(),
            isEditable : true
        };
        
        render(
            <Router>
                <Song {...props}/>
            </Router>);

        expect(screen.getByText("Edit")).toBeInTheDocument();
    });

    test("Edit button doesn't display when not editable", () => {
        const props = {
            songName : "Song Name Here",
            artistName : "Artist Name Here",
            songKey : "Song Key Here",
            deleteSongHandler : jest.fn(),
        };
        
        render(<Song {...props}/>);

        expect(() => screen.getByText("Edit")).toThrowError();
    });

    test("Bandleader Edit Route appears in Edit Button", () => {
        const props = {
            songName : "Song Name Here",
            artistName : "Artist Name Here",
            songKey : "Song Key Here",
            deleteSongHandler : jest.fn(),
            isEditable : true,
            songId : 1
        };
        
        render(
            <Router>
                <Song {...props}/>
            </Router>);

        expect(screen.getByTestId("EditLinkButton")).toBeInTheDocument();

        expect(screen.getByTestId("EditLinkButton").getAttribute("href")).toEqual("/bandleader/editSong/1");
    });

    test("Client Edit Route appears in Edit Button", () => {
        const props = {
            songName : "Song Name Here",
            artistName : "Artist Name Here",
            deleteSongHandler : jest.fn(),
            isEditable : true,
            songId : 1
        };
        
        render(
            <Router>
                <Song {...props}/>
            </Router>);

        expect(screen.getByTestId("EditLinkButton")).toBeInTheDocument();

        expect(screen.getByTestId("EditLinkButton").getAttribute("href")).toEqual("/client/editSong/1");
    });

    test("Delete Song On Click works properly", () => {
        const props = {
            songName : "Song Name Here",
            artistName : "Artist Name Here",
            deleteSongHandler : jest.fn(),
        };
        
        render(<Song {...props}/>);

        fireEvent.click(screen.getByTestId("RemoveButton"));

        expect(props.deleteSongHandler).toHaveBeenCalled();
    });

    test("Delete Song On Click doesn't use SongKey when not provided", () => {
        const props = {
            songName : "Song Name Here",
            artistName : "Artist Name Here",
            deleteSongHandler : jest.fn(),
        };
        
        render(<Song {...props}/>);

        fireEvent.click(screen.getByTestId("RemoveButton"));

        expect(props.deleteSongHandler).toHaveBeenCalled();

        expect(props.deleteSongHandler.mock.calls[0]).toContain(null);
    });

    test("Delete Song On Click uses SongKey when provided", () => {
        const props = {
            songName : "Song Name Here",
            artistName : "Artist Name Here",
            songKey : "Song Key Here",
            deleteSongHandler : jest.fn(),
        };
        
        render(<Song {...props}/>);

        fireEvent.click(screen.getByTestId("RemoveButton"));

        expect(props.deleteSongHandler).toHaveBeenCalled();

        expect(props.deleteSongHandler.mock.calls[0]).toContain(props.songKey);
    });
});