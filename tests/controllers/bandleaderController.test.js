const bandleaderController = require("../../controllers/bandleaderController");
const expect = require("chai").expect;
const UsersModel = require("../../models/UsersModel");
const BandleaderSongListModel = require("../../models/BandleaderSongListModel");
const ClientSongListModel = require("../../models/ClientSongListModel");
const mockRequest = require("../utils/mockRequest");
const mockResponse = require("../utils/mockResponse");
const mockNext = require("../utils/mockNext");

describe("BandLeaderController", () => {

    describe("postAddSong", () => {
        let id;

        const username = "postAddSongBandleader@gmail.com";

        it("postAddSong works properly", async () => {
            const body = {
                songName : "Bruno", 
                artistName : "The King",
                songKey : "F Major"
            };

            const token = {
                username,
            };

            const req = mockRequest({}, body, {}, token);
            const res = mockResponse();
            const next = mockNext;

            await bandleaderController.postAddSong(req, res, next);

            id = res.send.getCalls()[0].args[0].songList[0].id;

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
        });

        after(async () => await BandleaderSongListModel.deleteSong(username, id));
    });

    describe("getSongs", () => {
        let id;

        const songInfo = {
            songName : "Bruno", 
            artistName : "The King",
            songKey : "F Major"
        };

        const {songName, artistName, songKey} = songInfo;

        const username = "getSongsBandleader@gmail.com";

        before(async () => {
            return await BandleaderSongListModel.addSong(songName, artistName, songKey, username)
                .then(response => {
                    id = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("getSongs works correctly", async () => {
            const token = {
                username,
            };

            const req = mockRequest({}, {}, {}, token);
            const res = mockResponse();
            const next = mockNext;

            await bandleaderController.getSongs(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
        });

        after(async () => await BandleaderSongListModel.deleteSong(username, id));
    });

    describe("getSong", () => {
        let id;

        const songInfo = {
            songName : "Bruno", 
            artistName : "The King",
            songKey : "F Major"
        };

        const {songName, artistName, songKey} = songInfo;

        const username = "getSongBandleader@gmail.com";

        before(async () => {
            return await BandleaderSongListModel.addSong(songName, artistName, songKey, username)
                .then(response => {
                    id = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("getSong works correctly", async () => {
            const token = {
                username,
            };

            const params = {
                songId : id
            };

            const req = mockRequest({}, {}, params, token);
            const res = mockResponse();
            const next = mockNext;

            await bandleaderController.getSong(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
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

    describe("getClientSongs", () => {
        let id;

        const username = "";

        before(async () => {
            return await ClientSongListModel.addSong()
                .then(response => {
                    id = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("getClientSongs works correctly", async () => {
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

        after(async () => await ClientSongListModel.deleteSong(username, id));
    });

    describe("getSuggestedSetList", () => {
        let id;

        const username = "";
        
        before(async () => {
            return await UsersModel.register()
                .then(response => {
                    id = response[0].id;
                })
                .catch(err => console.log(err));
        });

        before(async () => {
            return await UsersModel.register()
                .then(response => {
                    id = response[0].id;
                })
                .catch(err => console.log(err));
        });

        before(async () => {
            return await ClientSongListModel.addSong()
                .then(response => {
                    id = response[0].id;
                })
                .catch(err => console.log(err));
        });

        before(async () => {
            return await BandleaderSongListModel.addSong()
                .then(response => {
                    id = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("getSuggestedSetList works correctly", async () => {
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

        after(async () => await ClientSongListModel.deleteSong(username, id));
    });

    describe("postCompletedSetList", () => {
        before(async () => {
            return await BandleaderSongListModel.addSong()
                .then(response => {
                    id = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("postCompletedSetList works correctly", async () => {
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

        after(async () => await ClientSongListModel.deleteSong(username, id));
    });

    describe("getClientSetListInfo", () => {
        before(async () => {
            return await BandleaderSongListModel.addSong()
                .then(response => {
                    id = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("getClientSetListInfo works correctly", async () => {
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

        after(async () => await ClientSongListModel.deleteSong(username, id));
    });

    describe("editCompletedSetList", () => {
        before(async () => {
            return await BandleaderSongListModel.addSong()
                .then(response => {
                    id = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("editCompletedSetList works correctly", async () => {
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

        after(async () => await ClientSongListModel.deleteSong(username, id));
    });

});