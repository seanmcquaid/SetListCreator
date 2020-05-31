const bandleaderController = require("../../controllers/bandleaderController");
const expect = require("chai").expect;
const UsersModel = require("../../models/UsersModel");
const BandleaderSongListModel = require("../../models/BandleaderSongListModel");
const ClientSongListModel = require("../../models/ClientSongListModel");
const SetListsModel = require("../../models/SetListsModel");
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
            const params = {
                songId : id
            };

            const token = {
                username,
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

        const songInfo = {
            songName : "Bruno", 
            artistName : "The King",
            songKey : "F Major"
        };

        const {songName, artistName, songKey} = songInfo;

        const username = "deleteSongBandleader@gmail.com";

        before(async () => {
            return await BandleaderSongListModel.addSong(songName, artistName, songKey, username)
                .then(response => {
                    id = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("deleteSong works correctly", async () => {
            const params = {
                songId : id,
            };

            const token = {
                username,
            };

            const req = mockRequest({}, {}, params, token);
            const res = mockResponse();
            const next = mockNext;

            await bandleaderController.deleteSong(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
        });

    });

    describe("editSong", () => {
        let id;

        const songInfo = {
            songName : "Bruno", 
            artistName : "The King",
            songKey : "F Major"
        };

        const {songName, artistName, songKey} = songInfo;

        const username = "editSongBandleader@gmail.com";

        before(async () => {
            return await BandleaderSongListModel.addSong(songName, artistName, songKey, username)
                .then(response => {
                    id = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("editSong works correctly", async () => {
            const body = {
                songName : "Bruno Mars", 
                artistName : "IS NOT THE King",
                songKey : "F# Major"
            };

            const params = {
                songId : id,
            };

            const token = {
                username,
            };

            const req = mockRequest({}, body, params, token);
            const res = mockResponse();
            const next = mockNext;

            await bandleaderController.editSong(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
        });

        after(async () => await BandleaderSongListModel.deleteSong(username, id));
    });

    describe("getClientSongs", () => {
        let clientId;

        const bandleaderUsername = "getClientSongs@gmail.com";
        const clientUsername = "clientName@gmail.com";

        const userInfo = {
            username : clientUsername,
            password : "password",
            accountType : "client",
            bandleaderName : bandleaderUsername
        };

        const {username, password, accountType, bandleaderName} = userInfo;

        before(async () => {
            return await UsersModel.register(username, password, accountType, bandleaderName)
                .then(response => {
                    clientId = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("getClientSongs works correctly", async () => {
            const params = {
                clientId
            };

            const token = {
                username : bandleaderUsername,
            };

            const req = mockRequest({}, {}, params, token);
            const res = mockResponse();
            const next = mockNext;

            await bandleaderController.getClientSongs(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
        });

        after(async () => await UsersModel.deleteUser(clientUsername));
    });

    describe("getSuggestedSetList", () => {
        let clientId;

        const bandleaderUsername = "getSuggestedSetList@gmail.com";
        const clientUsername = "clientName@gmail.com";

        const userInfo = {
            username : clientUsername,
            password : "password",
            accountType : "client",
            bandleaderName : bandleaderUsername
        };

        const {username, password, accountType, bandleaderName} = userInfo;
        
        before(async () => {
            return await UsersModel.register(username, password, accountType, bandleaderName)
                .then(response => {
                    clientId = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("getSuggestedSetList works correctly", async () => {

            const token = {
                username : bandleaderUsername
            };

            const req = mockRequest({}, body, {}, token);
            const res = mockResponse();
            const next = mockNext;

            await bandleaderController.getSuggestedSetList(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
        });

        after(async () => await UsersModel.deleteUser(username));
    });

    describe("postCompletedSetList", () => {

        let clientId;

        const bandleaderUsername = "postCompletedSetList";

        const clientUsername = "client";

        const clientInfo = {
            username : clientUsername,
            password : "password",
            accountType : "client",
            bandleaderName : bandleaderUsername
        };

        const {username, password, accountType, bandleaderName} = clientInfo;

        before(async () => {
            return await UsersModel.register(username, password, accountType, bandleaderName)
                .then(response => {
                    clientId = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("postCompletedSetList works correctly", async () => {
            const body = {
                completedSetList : ["Completed", "Set", "List"], 
                clientId,
                bandleaderComments : ["Bandleader", "Comments"]
            };

            const token = {
                username : bandleaderName,
            };

            const req = mockRequest({}, body, {}, token);
            const res = mockResponse();
            const next = mockNext;

            await bandleaderController.postCompletedSetList(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
        });

        after(async () => await ClientSongListModel.deleteSong(username, clientId));
    });

    describe("getClientSetListInfo", () => {
        let clientId;

        const bandleaderUsername = "postCompletedSetList";

        const clientUsername = "clientPostCompletedSetList";

        const clientInfo = {
            username : clientUsername,
            password : "password",
            accountType : "client",
            bandleaderName : bandleaderUsername
        };

        const setListInfo = {
            clientName : clientUsername,
            bandleaderName : bandleaderUsername,
            setList : ["Song", "Info", "Here"],
            bandleaderComments : ["Song Comments Here"]
        };

        before(async () => {
            return await UsersModel.register(clientInfo.username, clientInfo.password, clientInfo.accountType, clientInfo.bandleaderName)
                .then(response => {
                    clientId = response[0].id;
                })
                .catch(err => console.log(err));
        });

        before(async () => await SetListsModel.addSetList(setListInfo.clientName, setListInfo.bandleaderName, setListInfo.setList, setListInfo.bandleaderComments));

        it("getClientSetListInfo works correctly", async () => {
            const params = {
                clientId
            };

            const token = {
                username,
            };

            const req = mockRequest({}, {}, params, token);
            const res = mockResponse();
            const next = mockNext;

            await bandleaderController.getClientSetListInfo(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
        });

        after(async () => await UsersModel.deleteUser(clientInfo.username));

        after(async () => await SetListsModel.deleteSetList(setListInfo.clientName, setListInfo.bandleaderName));
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