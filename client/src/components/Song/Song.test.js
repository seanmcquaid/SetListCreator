import React from "react";
import Song from "./Song";
import { cleanup, render, fireEvent } from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";

describe("<Song/>", () => {

    afterEach(cleanup);
    test("Renders correctly when songKey is provided", () => {
        const props = {
            songName : "Song Name Here",
            artistName : "Artist Name Here",
            songKey : "Song Key Here",
            deleteSongHandler : jest.fn(),
        };
        
        const {getByTestId} = render(<Song {...props}/>);

        expect(getByTestId("Song Name HereSongKey")).toBeInTheDocument();
    });

    test("Renders correctly when songKey isn't provided", () => {
        const props = {
            songName : "Song Name Here",
            artistName : "Artist Name Here",
            deleteSongHandler : jest.fn(),
        };
        
        const {getByTestId} = render(<Song {...props}/>);

        expect(() => getByTestId("Song Name HereSongKey")).toThrowError();
    });

    test("Edit button displays when editable", () => {
        const props = {
            songName : "Song Name Here",
            artistName : "Artist Name Here",
            songKey : "Song Key Here",
            deleteSongHandler : jest.fn(),
            isEditable : true
        };
        
        const {getByText} = render(
            <Router>
                <Song {...props}/>
            </Router>);

        expect(getByText("Edit")).toBeInTheDocument();
    });

    test("Edit button doesn't display when not editable", () => {
        const props = {
            songName : "Song Name Here",
            artistName : "Artist Name Here",
            songKey : "Song Key Here",
            deleteSongHandler : jest.fn(),
        };
        
        const {getByText} = render(<Song {...props}/>);

        expect(() => getByText("Edit")).toThrowError();
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
        
        const {getByTestId} = render(
            <Router>
                <Song {...props}/>
            </Router>);

        expect(getByTestId("EditLinkButton")).toBeInTheDocument();

        expect(getByTestId("EditLinkButton").getAttribute("href")).toEqual("/bandleader/editSong/1");
    });

    test("Client Edit Route appears in Edit Button", () => {
        const props = {
            songName : "Song Name Here",
            artistName : "Artist Name Here",
            deleteSongHandler : jest.fn(),
            isEditable : true,
            songId : 1
        };
        
        const {getByTestId} = render(
            <Router>
                <Song {...props}/>
            </Router>);

        expect(getByTestId("EditLinkButton")).toBeInTheDocument();

        expect(getByTestId("EditLinkButton").getAttribute("href")).toEqual("/client/editSong/1");
    });

    test("Delete Song On Click works properly", () => {
        const props = {
            songName : "Song Name Here",
            artistName : "Artist Name Here",
            deleteSongHandler : jest.fn(),
        };
        
        const {getByTestId} = render(<Song {...props}/>);

        fireEvent.click(getByTestId("RemoveButton"));

        expect(props.deleteSongHandler).toHaveBeenCalled();
    });

    test("Delete Song On Click doesn't use SongKey when not provided", () => {
        const props = {
            songName : "Song Name Here",
            artistName : "Artist Name Here",
            deleteSongHandler : jest.fn(),
        };
        
        const {getByTestId} = render(<Song {...props}/>);

        fireEvent.click(getByTestId("RemoveButton"));

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
        
        const {getByTestId} = render(<Song {...props}/>);

        fireEvent.click(getByTestId("RemoveButton"));

        expect(props.deleteSongHandler).toHaveBeenCalled();

        expect(props.deleteSongHandler.mock.calls[0]).toContain(props.songKey);
    });
});