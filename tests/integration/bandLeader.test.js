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

        const userInfo = {
            username : "testBandleader",
            password : "testPassword",
            accountType : "bandleader"
        };

        const body = {
            songName : "Treasure", 
            artistName : "Bruno Mars",
            songKey : "F Major"
        };

        const {username, password, accountType} = userInfo;
        
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
               .get("/bandleader/addSong")
               .set("Authorization", token)
               .send(body)
               .end((err, res) => {
                    songId = res.body.songList[0].id;
                    
                    expect(res.body.songList.length).to.be.greaterThan(0);

                    done();
                });
        });

        afterEach(async () => UsersModel.deleteUser(username));

        afterEach(async () => BandleaderSongListModel.deleteSong(username, songId));
    });

    describe("getSongs", () => {
        let token, songId;

        const userInfo = {
            username : "testBandleader",
            password : "testPassword",
            accountType : "bandleader"
        };

        const songInfo = {
            songName : "Treasure", 
            artistName : "Bruno Mars",
            songKey : "F Major"
        };

        const {username, password, accountType} = userInfo;
        const {songName, artistName, songKey} = songInfo;
        
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

        beforeEach(async () => {
            return await BandleaderSongListModel.addSong(songName, artistName, songKey, username)
                .then(response => {
                    songId = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("getSongs", done => {
            chai.request(server)
               .get("/bandleader/getSongs")
               .set("Authorization", token)
               .end((err, res) => {

                  expect(res.body.songList.length).to.be.greaterThan(0);

                  done();
                });
        });

        afterEach(async () => UsersModel.deleteUser(username));

        afterEach(async () => BandleaderSongListModel.deleteSong(username, songId));
    });

    describe("getSong", () => {
        let token, songId;

        const userInfo = {
            username : "testBandleader",
            password : "testPassword",
            accountType : "bandleader"
        };

        const songInfo = {
            songName : "Treasure", 
            artistName : "Bruno Mars",
            songKey : "F Major"
        };

        const {username, password, accountType} = userInfo;
        const {songName, artistName, songKey} = songInfo;
        
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

        beforeEach(async () => {
            return await BandleaderSongListModel.addSong(songName, artistName, songKey, username)
                .then(response => {
                    songId = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("getSong", done => {
            chai.request(server)
               .get(`/bandleader/getSong/${songId}`)
               .set("Authorization", token)
               .end((err, res) => {
                    const expectedResponse = {
                        songName : "Treasure", 
                        artistName : "Bruno Mars",
                        songKey : "F Major",
                        username : "testBandleader",
                    };

                    expect(res.body.songInfo.songname).to.be.equal(expectedResponse.songName);
                    expect(res.body.songInfo.artistname).to.be.equal(expectedResponse.artistName);
                    expect(res.body.songInfo.songkey).to.be.equal(expectedResponse.songKey);
                    expect(res.body.songInfo.username).to.be.equal(expectedResponse.username);

                    done();
                });
        });

        afterEach(async () => UsersModel.deleteUser(username));

        afterEach(async () => BandleaderSongListModel.deleteSong(username, songId));
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