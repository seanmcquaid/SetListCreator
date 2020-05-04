const UsersModel = require("../../models/UsersModel");
const expect = require("chai").expect;

describe("UsersModel", () => {

    describe("userExists", () => {
        const body = {
            username : "testClient",
            password : "testPassword",
            selectedBandleader : "fillerbandleader@gmail.com"
         };

        const {username, password, selectedBandleader} = body;

        before(done => {
            UsersModel.register(username, password, "client", selectedBandleader)
                     .then(response => done())
                     .catch(err => console.log(err));
         });

        it("userExists returns as expected", done => {
            UsersModel.userExists(username)
                    .then(response => {
                        const expectedResponse = { 
                            username: "testClient",
                            accountType: "client",
                            bandleaderName: "fillerbandleader@gmail.com",
                            setlistAvailable: false 
                        };

                        const userInfo = response[0];

                        expect(userInfo.username).to.equal(expectedResponse.username);
                        expect(userInfo.accounttype).to.equal(expectedResponse.accountType);
                        expect(userInfo.bandleadername).to.equal(expectedResponse.bandleaderName);
                        expect(userInfo.setlistavailable).to.equal(expectedResponse.setlistAvailable);
                        done();
                    })
                    .catch(err => console.log(err));
        });

        after(done => { 
            UsersModel.deleteUser(username)
                     .then(response => done())
                     .catch(err => console.log(err));
         });

    });

    describe("register", () => {
        const body = {
            username : "testClient1",
            password : "testPassword1",
            selectedBandleader : "fillerbandleader@gmail.com"
         };

        const {username, password, selectedBandleader} = body;

        it("register works", done => {
            UsersModel.register(username, password, "client", selectedBandleader)
                        .then(response => {
                            const expectedResponse = { 
                                username: "testClient1",
                                accountType: "client",
                                bandleaderName: "fillerbandleader@gmail.com",
                                setlistAvailable: false 
                            };
    
                            const userInfo = response[0];
    
                            expect(userInfo.username).to.equal(expectedResponse.username);
                            expect(userInfo.accounttype).to.equal(expectedResponse.accountType);
                            expect(userInfo.bandleadername).to.equal(expectedResponse.bandleaderName);
                            expect(userInfo.setlistavailable).to.equal(expectedResponse.setlistAvailable);
                            done();
                        })
                        .catch(err => console.log(err));
        })

        after(done => {
            UsersModel.deleteUser(username)
                     .then(response => done())
                     .catch(err => console.log(err));
        });
    });

    describe("getAllBandleaders", () => {

        const body = {
            username : "testBandleader",
            password : "testPassword",
         };

         const {username, password} = body;

         before(done => {
            UsersModel.register(username, password, "bandLeader", null)
                    .then(response => done())
                    .catch(err => console.log(err));
         });

        it("getAllBandleaders works", done => {
            UsersModel.getAllBandleaders()
                    .then(response => {
                        expect(response.length).to.be.greaterThan(0);
                        done();
                    })
                    .catch(err => console.log(err));
        });

        after(done => {
            UsersModel.deleteUser(username)
                    .then(response => done())
                    .catch(err => console.log(err));
        });

    });

    describe("getUserInfo", () => {
        let userId;

        const body = {
            username : "testBandleader",
            password : "testPassword",
         };

        const {username, password} = body;

        before(done => {
            UsersModel.register(username, password, "bandLeader", null)
                    .then(response =>{
                        userId = response[0].id;
                        done();
                    })
                    .catch(err => console.log(err));
         });

        it("getUserInfo works", done => {
            UsersModel.getUserInfo(userId)
                    .then(response => {
                        const expectedResponse = { 
                            username: "testBandleader",
                            accounttype: "bandLeader",
                            bandleadername: null,
                            setlistavailable: false 
                        };
                        expect(expectedResponse.username).to.equal(response[0].username);
                        expect(expectedResponse.accounttype).to.equal(response[0].accounttype);
                        expect(expectedResponse.bandleadername).to.equal(response[0].bandleadername);
                        expect(expectedResponse.setlistavailable).to.equal(response[0].setlistavailable);
                    })
                    .catch(err => console.log(err));
            done();
        });

        after(done => {
            UsersModel.deleteUser(username)
                    .then(response => done())
                    .catch(err => console.log(err));
        });
    });

    describe("editUserInfo", () => {
        let userId;

        const body = {
            username : "testBandleader",
            password : "testPassword",
         };

        const {username, password} = body;

        before(done => {
            UsersModel.register(username, password, "bandLeader", null)
                    .then(response =>{
                        userId = response[0].id;
                        done();
                    })
                    .catch(err => console.log(err));
        });

        it("editUserInfo works", done => {
            UsersModel.editUserInfo("newUsername", "newPassword", userId)
                    .then(response => {
                        const expectedResponse = { 
                            username: "newUsername",
                            accounttype: "bandLeader",
                            bandleadername: null,
                            setlistavailable: false 
                        };
                        expect(expectedResponse.username).to.equal(response[0].username);
                        expect(expectedResponse.accounttype).to.equal(response[0].accounttype);
                        expect(expectedResponse.bandleadername).to.equal(response[0].bandleadername);
                        expect(expectedResponse.setlistavailable).to.equal(response[0].setlistavailable);
                        done();
                    })
                    .catch(err => console.log(err));
        });

        after(done => {
            UsersModel.deleteUser("newUsername")
                    .then(response => done())
                    .catch(err => console.log(err));
        });
    });

    describe("getClientsForBandleader", () => {

        const bandleaderBody = {
            username : "testBandleader",
            password : "testPassword",
        };
   
         const clientBody = {
            username : "testClient",
            password : "testPassword",
            selectedBandleader : "testBandleader"
        };

        before(done => {
            UsersModel.register(bandleaderBody.username, bandleaderBody.password, "bandLeader", null)
                     .then(response =>done())
                     .catch(err => console.log(err));
         });
   
         before(done => {
            UsersModel.register(clientBody.username, clientBody.password, "client", clientBody.selectedBandleader)
                     .then(response => done())
                     .catch(err => console.log(err));
         })

        it("getClientsForBandleader works", done => {
            UsersModel.getClientsForBandleader(bandleaderBody.username)
                    .then(response => {
                        const expectedResponse = { username: "testClient", setlistavailable: false};

                        expect(response[0].username).to.equal(expectedResponse.username);
                        expect(response[0].setlistavailable).to.equal(expectedResponse.setlistavailable);
                        done();
                    })
                    .catch(err => console.log(err));
        });

        after(done => {
            UsersModel.deleteUser(bandleaderBody.username)
                     .then(response => done())
                     .catch(err => console.log(err));
         });
   
        after(done => {
            UsersModel.deleteUser(clientBody.username)
                    .then(response => done())
                    .catch(err => console.log(err));
        });
    });

    describe("setClientSetlistAvailability", () => {

        const userInfo = {
            username : "testClient",
            password : "testPassword",
            selectedBandleader : "testBandleader"
        };

        const body = {
            setlistAvailability : true
        };

        before(done => {
            UsersModel.register(userInfo.username, userInfo.password, "client", userInfo.selectedBandleader)
                    .then(response => done())
                    .catch(err => console.log(err));
        });

        it("setClientSetlistAvailability works", done => {
            UsersModel.setClientSetlistAvailability(userInfo.username, body.setlistAvailability)
                    .then(response => {
                        const expectedResponse = { 
                            username: "testClient",
                            accounttype: "client",
                            bandleadername: "testBandleader",
                            setlistavailable: true 
                        }

                        expect(response[0].username).to.equal(expectedResponse.username);
                        expect(response[0].accounttype).to.equal(expectedResponse.accounttype);
                        expect(response[0].bandleadername).to.equal(expectedResponse.bandleadername);
                        expect(response[0].setlistavailable).to.equal(expectedResponse.setlistavailable);

                        done();
                    })
                    .catch(err => console.log(err));
        });

        after(done => {
            UsersModel.deleteUser(userInfo.username)
                     .then(response => done())
                     .catch(err => console.log(err));
         });


    });
    
});