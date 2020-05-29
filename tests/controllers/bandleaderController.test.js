const bandleaderController = require("../../controllers/bandleaderController");
const expect = require("chai").expect;
const UsersModel = require("../../models/UsersModel");
const mockRequest = require("../utils/mockRequest");
const mockResponse = require("../utils/mockResponse");
const mockNext = require("../utils/mockNext");

describe("BandLeaderController", () => {

    describe("postAddSong", () => {
        it("postAddSong", done => {
            expect(2).to.equal(2);
            done();
        });
    });

    describe("getSongs", () => {
        it("getSongs", done => {
            expect(2).to.equal(2);
            done();
        });
    });

    describe("getSong", () => {
        it("getSong", done => {
            expect(2).to.equal(2);
            done();
        });
    });

    describe("deleteSong", () => {
        it("deleteSong", done => {
            expect(2).to.equal(2);
            done();
        });
    });

    describe("editSong", () => {
        it("editSong", done => {
            expect(2).to.equal(2);
            done();
        });
    });

    describe("getClientSongs", () => {
        it("getClientSongs", done => {
            expect(2).to.equal(2);
            done();
        });
    });

    describe("getSuggestedSetList", () => {
        it("getSuggestedSetList", done => {
            expect(2).to.equal(2);
            done();
        });
    });

    describe("postCompletedSetList", () => {
        it("postCompletedSetList", done => {
            expect(2).to.equal(2);
            done();
        });
    });

    describe("getClientSetListInfo", () => {
        it("getClientSetListInfo", done => {
            expect(2).to.equal(2);
            done();
        });
    });

    describe("editCompletedSetList", () => {
        it("editCompletedSetList", done => {
            expect(2).to.equal(2);
            done();
        });
    });

});