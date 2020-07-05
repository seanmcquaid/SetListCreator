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

        const {username, password, accountType, bandleaderName} = userInfo;
        
        before(async () => {
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
            const songType = "requestedSong";

            const body = {
                songName : "Treasure", 
                artistName : "Bruno Mars",
            };
    
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

        after(async () => UsersModel.deleteUser(username));

        after(async () => ClientSongListModel.deleteSong(username, songId));
    });

    describe("getSongs", () => {
        let token, songId;

        const userInfo = {
            username : "testClient",
            password : "testPassword",
            accountType : "client",
            bandleaderName : "testBandleader" 
        };

        const {username, password, accountType, bandleaderName} = userInfo;
        
        before(async () => {
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

        const songInfo = {
            songName : "Treasure", 
            artistName : "Bruno Mars",
            songType : "requestedSong",
        };

        const {songName, artistName, songType} = songInfo;

        before(async () => {
            return await ClientSongListModel.addSong(songName, artistName, songType, username)
                .then(response => {
                    songId = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("getSongs", done => {
            chai.request(server)
               .get("/client/getSongs")
               .set("Authorization", token)
               .end((err, res) => {

                    const expectedResponse = {
                        setListAvailable : false,
                        clientApproved : false,
                    };
                    
                    expect(res.body.requestedSongsList.length).to.be.greaterThan(0);
                    expect(res.body.doNotPlaySongsList.length).to.equal(0);

                    expect(res.body.setListAvailable).to.be.equal(expectedResponse.setListAvailable);
                    expect(res.body.clientApproved).to.be.equal(expectedResponse.clientApproved);

                    done();
                });
        });

        after(async () => UsersModel.deleteUser(username));

        after(async () => ClientSongListModel.deleteSong(username, songId));
    });

    describe("getSong", () => {
        let token, songId;

        const userInfo = {
            username : "testClient",
            password : "testPassword",
            accountType : "client",
            bandleaderName : "testBandleader" 
        };

        const {username, password, accountType, bandleaderName} = userInfo;
        
        before(async () => {
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

        const songInfo = {
            songName : "Treasure", 
            artistName : "Bruno Mars",
            songType : "requestedSong",
        };

        const {songName, artistName, songType} = songInfo;

        before(async () => {
            return await ClientSongListModel.addSong(songName, artistName, songType, username)
                .then(response => {
                    songId = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("getSong", done => {
            chai.request(server)
               .get(`/client/getSong/${songId}`)
               .set("Authorization", token)
               .end((err, res) => {
                    const expectedResponse = {
                        songName : "Treasure", 
                        artistName : "Bruno Mars",
                        songType : "requestedSong",
                        username : "testClient",
                    };

                    expect(res.body.songInfo.songname).to.be.equal(expectedResponse.songName);
                    expect(res.body.songInfo.artistname).to.be.equal(expectedResponse.artistName);
                    expect(res.body.songInfo.songkey).to.be.equal(expectedResponse.songKey);
                    expect(res.body.songInfo.username).to.be.equal(expectedResponse.username);

                    done();
                });
        });

        after(async () => UsersModel.deleteUser(username));

        after(async () => ClientSongListModel.deleteSong(username, songId));
    });

    describe("deleteSong", () => {
        let token, songId;

        const userInfo = {
            username : "testClient",
            password : "testPassword",
            accountType : "client",
            bandleaderName : "testBandleader" 
        };

        const {username, password, accountType, bandleaderName} = userInfo;
        
        before(async () => {
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

        const songInfo = {
            songName : "Treasure", 
            artistName : "Bruno Mars",
            songType : "requestedSong",
        };

        const {songName, artistName, songType} = songInfo;

        before(async () => {
            return await ClientSongListModel.addSong(songName, artistName, songType, username)
                .then(response => {
                    songId = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("deleteSong", done => {
            chai.request(server)
               .delete(`/client/deleteSong/${songId}`)
               .set("Authorization", token)
               .end((err, res) => {

                    const expectedResponse = {
                        setListAvailable : false,
                        clientApproved : false,
                    };
                    
                    expect(res.body.requestedSongsList.length).to.equal(0);
                    expect(res.body.doNotPlaySongsList.length).to.equal(0);

                    expect(res.body.setListAvailable).to.be.equal(expectedResponse.setListAvailable);
                    expect(res.body.clientApproved).to.be.equal(expectedResponse.clientApproved);

                    done();
                });
        });

        after(async () => UsersModel.deleteUser(username));
    });

    describe("editSong", () => {
        let token, songId;

        const userInfo = {
            username : "testClient",
            password : "testPassword",
            accountType : "client",
            bandleaderName : "testBandleader" 
        };

        const {username, password, accountType, bandleaderName} = userInfo;
        
        before(async () => {
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

        const songInfo = {
            songName : "Treasure", 
            artistName : "Bruno Mars",
            songType : "requestedSong",
        };

        const {songName, artistName, songType} = songInfo;

        before(async () => {
            return await ClientSongListModel.addSong(songName, artistName, songType, username)
                .then(response => {
                    songId = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("editSong", done => {
            const body = {
                songName : "Treasure", 
                artistName : "Bruno Mars",
                playListType : "doNotPlaySong"
            };
            
            chai.request(server)
               .patch(`/client/editSong/${songId}`)
               .set("Authorization", token)
               .send(body)
               .end((err, res) => {
                    const expectedResponse = {
                        setListAvailable : false,
                        clientApproved : false,
                    };

                    songId = res.body.doNotPlaySongsList[0].id;
                    
                    expect(res.body.requestedSongsList.length).to.equal(0);
                    expect(res.body.doNotPlaySongsList.length).to.be.greaterThan(0);

                    expect(res.body.setListAvailable).to.be.equal(expectedResponse.setListAvailable);
                    expect(res.body.clientApproved).to.be.equal(expectedResponse.clientApproved);

                    done();
                });
        });

        after(async () => UsersModel.deleteUser(username));

        after(async () => ClientSongListModel.deleteSong(username, songId));
    });

    describe("getCompletedSetList", () => {
        let token;

        const userInfo = {
            username : "testClient",
            password : "testPassword",
            accountType : "client",
            bandleaderName : "testBandleader" 
        };

        const {username, password, accountType, bandleaderName} = userInfo;

        before(async () => {
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

        const setListInfo = {
            clientName : username,
            bandleaderName,
            setList : [{info : "Completed Set List"}],
            bandleaderComments : ["Song Comments Here"]
        };

        before(async () => await SetListsModel.addSetList(setListInfo.clientName, setListInfo.bandleaderName, setListInfo.setList, setListInfo.bandleaderComments));

        it("getCompletedSetList", async () => {
            chai.request(server)
               .get("/client/getCompletedSetList")
               .set("Authorization", token)
               .end((err, res) => {
                    const expectedResponse = {
                        clientName : username,
                        bandleaderName,
                        suggestedSetList : [ { info: 'Completed Set List' } ],
                        bandleaderComments : ["Song Comments Here"]
                    };

                    expect(res.body.clientName).to.equal(expectedResponse.clientName);
                    expect(res.body.bandleaderName).to.equal(expectedResponse.bandleaderName);
                    expect(res.body.suggestedSetList).to.equals(expectedResponse.suggestedSetList);
                    expect(res.body.bandleaderComments).to.equal(expectedResponse.bandleaderComments);

                    done();
                });
        });

        after(async () => await UsersModel.deleteUser(username));

        after(async () => await SetListsModel.deleteSetList(setListInfo.clientName, setListInfo.bandleaderName));
    });

    describe("editCompletedSetListComments", () => {
        let token;

        const userInfo = {
            username : "testClient",
            password : "testPassword",
            accountType : "client",
            bandleaderName : "testBandleader" 
        };

        const {username, password, accountType, bandleaderName} = userInfo;

        before(async () => {
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

        const setListInfo = {
            clientName : username,
            bandleaderName,
            setList : [{info : "Completed Set List"}],
            bandleaderComments : ["Song Comments Here"]
        };

        before(async () => await SetListsModel.addSetList(setListInfo.clientName, setListInfo.bandleaderName, setListInfo.setList, setListInfo.bandleaderComments));

        it("editCompletedSetListComments", async () => {
            const body = {
                clientComments : ["Not", "Great"], 
                clientApproval : true,
            };
            
            chai.request(server)
               .patch("/client/editCompletedSetListComments")
               .set("Authorization", token)
               .send(body)
               .end((err, res) => {
                    const expectedResponse = {
                        clientName : username,
                        bandleaderName,
                        setList : [{info : "Completed Set List"}],
                        bandleaderComments : ["Song Comments Here"],
                        clientComments : ["Not", "Great"], 
                        clientApproved : true,
                    };

                    expect(res.body.setListInfo.clientname).to.equal(expectedResponse.clientName);
                    expect(res.body.setListInfo.bandleadername).to.equal(expectedResponse.bandleaderName);
                    expect(res.body.setListInfo.setlist).to.equal(expectedResponse.setList);
                    expect(res.body.setListInfo.bandleadercomments).to.equal(expectedResponse.bandleaderComments);
                    expect(res.body.setListInfo.clientcomments).to.equal(expectedResponse.clientComments);
                    expect(res.body.setListInfo.clientapproved).to.equal(expectedResponse.clientApproved);

                    done();
                });
        });

        after(async () => await UsersModel.deleteUser(username));

        after(async () => await SetListsModel.deleteSetList(setListInfo.clientName, setListInfo.bandleaderName));
    });

});