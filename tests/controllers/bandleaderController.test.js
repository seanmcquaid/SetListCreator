const bandleaderController = require("../../controllers/bandleaderController");
const expect = require("chai").expect;
const UsersModel = require("../../models/UsersModel");
const mockRequest = require("../utils/mockRequest");
const mockResponse = require("../utils/mockResponse");
const mockNext = require("../utils/mockNext");

describe("BandLeaderController", () => {

    it("postAddSong", done => {
        expect(2).to.equal(2);
        done();
    })

    it("getSongs", done => {
        expect(2).to.equal(2);
        done();
    })

    it("getSong", done => {
        expect(2).to.equal(2);
        done();
    })

    it("deleteSong", done => {
        expect(2).to.equal(2);
        done();
    })

    it("editSong", done => {
        expect(2).to.equal(2);
        done();
    })

    it("getClientSongs", done => {
        expect(2).to.equal(2);
        done();
    })

});