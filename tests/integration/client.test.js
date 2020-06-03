const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("../../app");
const UsersModel = require("../../models/UsersModel");
const ClientSongListModel = require("../../models/ClientSongListModel");
const SetListsModel = require("../../models/SetListsModel");
const config = require("../../config/config");
const jwt = require("jsonwebtoken");

chai.use(chaiHttp);

describe("Client Routes", () => {

    describe("addSong", () => {
        let token, songId;

        const userInfo = {
            username : "testClient",
            password : "testPassword",
            accountType : "client",
            bandleaderName : "testBandleader" 
        };

        const body = {
            songName : "Treasure", 
            artistName : "Bruno Mars",
        };

        const songType = "requestedSong";

        const {username, password, accountType, bandleaderName} = userInfo;
        
        beforeEach(async () => {
            return await UsersModel.register(username, password, accountType, bandleaderName)
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
               .post(`/client/addSong/${songType}`)
               .set("Authorization", token)
               .send(body)
               .end((err, res) => {

                    const expectedResponse = {
                        setListAvailable : false,
                        clientApproved : false,
                    };

                    songId = res.body.requestedSongsList[0].id;
                    
                    expect(res.body.requestedSongsList.length).to.be.greaterThan(0);
                    expect(res.body.doNotPlaySongsList.length).to.equal(0);

                    expect(res.body.setListAvailable).to.be.equal(expectedResponse.setListAvailable);
                    expect(res.body.clientApproved).to.be.equal(expectedResponse.clientApproved);

                    done();
                });
        });

        afterEach(async () => UsersModel.deleteUser(username));

        afterEach(async () => ClientSongListModel.deleteSong(username, songId));
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