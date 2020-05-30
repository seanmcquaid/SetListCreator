const clientController = require("../../controllers/clientController");
const expect = require("chai").expect;

describe("ClientController", () => {

    describe("postAddSong", () => {
        let id;

        const username = "postAddSongBandleader@gmail.com"

        it("postAddSong works properly", async () => {
            const body = {
                songName : "", 
                artistName : "",
                songKey : ""
            };

            const token = {
                username,
            };

            const req = mockRequest({}, body, {}, token);
            const res = mockResponse();
            const next = mockNext;

            // res.send.arguments
        });

        after(async () => await BandleaderSongListModel.deleteSong(username, id));
    });

    describe("deleteSong", () => {
        let id;

        const username = "";

        before(async () => {
            return await BandleaderSongListModel.addSong()
                .then(response => {
                    id = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("deleteSong works correctly", async () => {
            const body = {
                songName : "", 
                artistName : "",
                songKey : ""
            };

            const token = {
                username,
            };

            const req = mockRequest({}, body, {}, token);
            const res = mockResponse();
            const next = mockNext;
        });

    });

    describe("getSongs", () => {
        let id;

        const username = "";

        before(async () => {
            return await BandleaderSongListModel.addSong()
                .then(response => {
                    id = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("getSongs works correctly", async () => {
            const body = {
                songName : "", 
                artistName : "",
                songKey : ""
            };

            const token = {
                username,
            };

            const req = mockRequest({}, body, {}, token);
            const res = mockResponse();
            const next = mockNext;
        });

        after(async () => await BandleaderSongListModel.deleteSong(username, id));
    });


    describe("getSong", () => {
        let id;

        const username = "";

        before(async () => {
            return await BandleaderSongListModel.addSong()
                .then(response => {
                    id = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("getSong works correctly", async () => {
            const body = {
                songName : "", 
                artistName : "",
                songKey : ""
            };

            const token = {
                username,
            };

            const req = mockRequest({}, body, {}, token);
            const res = mockResponse();
            const next = mockNext;
        });

        after(async () => await BandleaderSongListModel.deleteSong(username, id));
    });


    describe("editSong", () => {
        let id;

        const username = "";

        before(async () => {
            return await BandleaderSongListModel.addSong()
                .then(response => {
                    id = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("editSong works correctly", async () => {
            const body = {
                songName : "", 
                artistName : "",
                songKey : ""
            };

            const token = {
                username,
            };

            const req = mockRequest({}, body, {}, token);
            const res = mockResponse();
            const next = mockNext;
        });

        after(async () => await BandleaderSongListModel.deleteSong(username, id));
    });

    describe("getCompletedSetList", () => {
        let id;

        const username = "";

        before(async () => {
            return await BandleaderSongListModel.addSong()
                .then(response => {
                    id = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("getCompletedSetList works correctly", async () => {
            const body = {
                songName : "", 
                artistName : "",
                songKey : ""
            };

            const token = {
                username,
            };

            const req = mockRequest({}, body, {}, token);
            const res = mockResponse();
            const next = mockNext;
        });

        after(async () => await BandleaderSongListModel.deleteSong(username, id));
    });

    describe("editCompletedSetListComments", () => {
        let id;

        const username = "";

        before(async () => {
            return await BandleaderSongListModel.addSong()
                .then(response => {
                    id = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("editCompletedSetListComments works correctly", async () => {
            const body = {
                songName : "", 
                artistName : "",
                songKey : ""
            };

            const token = {
                username,
            };

            const req = mockRequest({}, body, {}, token);
            const res = mockResponse();
            const next = mockNext;
        });

        after(async () => await BandleaderSongListModel.deleteSong(username, id));
    });

});