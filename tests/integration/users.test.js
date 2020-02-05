const assert = require("assert");
const expect = require("chai").expect;
const request = require("chai").request;
const server = require("../../app");

describe("User Routes", () => {

    describe("Register", () => {
        it("register creates a new user", done => {
            done();
         })

         it("register will not be successful if a user exists", done => {
            request(server)
    
           done();
        })
    })

    describe("Login", () => {

        it("login fails", done => {
            done();
         })

         it("login passes", done => {
            done();
         })

         it("login will not work if the password is incorrect", done => {
            done();
         })
    })

    describe("checkToken", () => {

        it("checkToken works when provided valid jwt", done => {
            done();
         })

         it("checkToken will fail", done => {
            done();
         })
    })

    it("getBandleaders", done => {
       done();
    })

    it("getClientsForBandleader", done => {
       done();
    })

    it("clientInfo", done => {
       done();
    })

    it("getUserInfo", done => {
       done();
    })

    it("editUserInfo", done => {
       done();
    })

    it("sendClientSetlist", done => {
       done();
    })

});