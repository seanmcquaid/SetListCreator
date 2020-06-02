const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("../../app");
const UsersModel = require("../../models/UsersModel");
const config = require("../../config/config");
const jwt = require("jsonwebtoken");

chai.use(chaiHttp);

describe("Client Routes", () => {

    describe("addSong", () => {
        it("addSong", done => {
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

    describe("getCompletedSetList", () => {
        it("getCompletedSetList", done => {
            expect(2).to.equal(2);
            done();
        });
    });

    describe("editCompletedSetListComments", () => {
        it("editCompletedSetListComments", done => {
            expect(2).to.equal(2);
            done();
        });
    });

});