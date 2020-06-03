const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("../../app");
const UsersModel = require("../../models/UsersModel");
const BandleaderSongListModel = require("../../models/BandleaderSongListModel");
const config = require("../../config/config");
const jwt = require("jsonwebtoken");

chai.use(chaiHttp);

describe("Bandleader Routes", () => {

    describe("addSong", () => {

        let token, songId;

        const body = {
            username : "testBandleader",
            password : "testPassword",
            accountType : "bandleader"
        };

        const {username, password, accountType} = body;
        
        beforeEach(async () => {
            return await UsersModel.register(username, password, accountType)
                .then(response => {
                    const specificUserInfo = response[0];
                    const {id, accounttype} = specificUserInfo;
                    token = jwt.sign(
                        {
                            id : id,
                            username : specificUserInfo.username,
                            accountType : accounttype
                        },
                        config.jwtSecret,
                        {expiresIn : 3600000}
                    );
                })
                .catch(err => console.log(err));
        });

        it("addSong", done => {
            chai.request(server)
               .get("/users/checkToken")
               .set("Authorization", token)
               .end((err, res) => {

                  expect(res.body.songList.length).to.be.greaterThan(0);

                  done();
                });
        });

        afterEach(async () => UsersModel.deleteUser(username));

        afterEach(async () => BandleaderSongListModel.deleteSong(username, songId));
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