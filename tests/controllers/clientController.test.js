const clientController = require("../../controllers/clientController");
const UsersModel = require("../../models/UsersModel");
const ClientSongListModel = require("../../models/ClientSongListModel");
const expect = require("chai").expect;

describe("ClientController", () => {

    describe("postAddSong", () => {
        let clientId, songId;

        const username = "postAddSongClient@gmail.com";
        const bandleaderName = "postAddSongBandleader@gmail.com"

        const userInfo = {
            username,
            password : "password",
            accountType : "client",
            bandleaderName
        };

        before(async () => {
            return await UsersModel.register(userInfo.username, userInfo.password, userInfo.accountType, userInfo.bandleaderName)
                .then(response => {
                    clientId = response[0].id
                })
                .catch(err => console.log(err));
        });

        it("postAddSong works properly", async () => {
            const body = {
                songName : "Bruno", 
                artistName : "The King",
            };

            const params = {
                songType : "requestedSong" 
            };

            const token = {
                username,
                id : clientId
            };

            const req = mockRequest({}, body, params, token);
            const res = mockResponse();
            const next = mockNext;

            await clientController.postAddSong(req, res, next);

            songId = res.send.getCalls()[0].args[0].requestedSongsList[0].id;

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
        });

        after(async () => await UsersModel.deleteUser(username));

        after(async () => await ClientSongListModel.deleteSong(username, songId));
    });

    describe("deleteSong", () => {
        let clientId, songId;

        const username = "deleteSongClient@gmail.com";
        const bandleaderName = "deleteSongBandleader@gmail.com"

        const userInfo = {
            username,
            password : "password",
            accountType : "client",
            bandleaderName
        };

        const songInfo = {
            songName : "Bruno", 
            artistName : "The King",
            songType : "requestedSong",
            username
        };

        before(async () => {
            return await UsersModel.register(userInfo.username, userInfo.password, userInfo.accountType, userInfo.bandleaderName)
                .then(response => {
                    clientId = response[0].id
                })
                .catch(err => console.log(err));
        });

        before(async () => {
            return await ClientSongListModel.addSong(songInfo.songName, songInfo.artistName, songInfo.songType, songInfo.username)
                .then(response => {
                    songId = response[0].id
                })
                .catch(err => console.log(err));
        });

        it("deleteSong works properly", async () => {

            const params = {
                songId
            };

            const token = {
                username,
                id : clientId
            };

            const req = mockRequest({}, {}, params, token);
            const res = mockResponse();
            const next = mockNext;

            await clientController.deleteSong(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
        });

        after(async () => await UsersModel.deleteUser(username));

    });

    describe("getSongs", () => {
        let clientId, songId;

        const username = "getSongsClient@gmail.com";
        const bandleaderName = "getSongsBandleader@gmail.com"

        const userInfo = {
            username,
            password : "password",
            accountType : "client",
            bandleaderName
        };

        const songInfo = {
            songName : "Bruno", 
            artistName : "The King",
            songType : "requestedSong",
            username
        };

        before(async () => {
            return await UsersModel.register(userInfo.username, userInfo.password, userInfo.accountType, userInfo.bandleaderName)
                .then(response => {
                    clientId = response[0].id
                })
                .catch(err => console.log(err));
        });

        before(async () => {
            return await ClientSongListModel.addSong(songInfo.songName, songInfo.artistName, songInfo.songType, songInfo.username)
                .then(response => {
                    songId = response[0].id
                })
                .catch(err => console.log(err));
        });

        it("getSongs works properly", async () => {

            const token = {
                username,
                id : clientId
            };

            const req = mockRequest({}, {}, {}, token);
            const res = mockResponse();
            const next = mockNext;

            await clientController.getSongs(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
        });

        after(async () => await UsersModel.deleteUser(username));

        after(async () => await ClientSongListModel.deleteSong(username, songId));
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