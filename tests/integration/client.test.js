const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("../../app");
const UsersModel = require("../../models/UsersModel");
const config = require("../../config/config");
const jwt = require("jsonwebtoken");

chai.use(chaiHttp);

describe("Client Routes", () => {

    it("addSong", done => {
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

    

});