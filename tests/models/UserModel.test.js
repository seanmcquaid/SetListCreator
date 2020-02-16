const UserModel = require("../../models/UserModel");
const expect = require("chai").expect;

describe("UserModel", () => {

    describe("userExists", () => {
        const body = {
            username : "testClient",
            password : "testPassword",
            selectedBandleader : "fillerbandleader@gmail.com"
         };

        const {username, password, selectedBandleader} = body;

        before(done => {
            UserModel.register(username, password, "client", selectedBandleader)
                     .then(response => done())
                     .catch(err => console.log(err));
         });

        it("userExists returns as expected", done => {
            UserModel.userExists(username)
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
            UserModel.deleteUser(username)
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
            UserModel.register(username, password, "client", selectedBandleader)
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
            UserModel.deleteUser(username)
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
            UserModel.register(username, password, "bandLeader", null)
                    .then(response => done())
                    .catch(err => console.log(err));
         });

        it("getAllBandleaders works", done => {
            UserModel.getAllBandleaders()
                    .then(response => {
                        expect(response.length).to.be.greaterThan(0);
                        done();
                    })
                    .catch(err => console.log(err));
        });

        after(done => {
            UserModel.deleteUser(username)
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
            UserModel.register(username, password, "bandLeader", null)
                    .then(response =>{
                        userId = response[0].id;
                        done();
                    })
                    .catch(err => console.log(err));
         });

        it("getUserInfo works", done => {
            UserModel.getUserInfo(userId)
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
            UserModel.deleteUser(username)
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
            UserModel.register(username, password, "bandLeader", null)
                    .then(response =>{
                        userId = response[0].id;
                        done();
                    })
                    .catch(err => console.log(err));
        });

        it("editUserInfo works", done => {
            UserModel.editUserInfo("newUsername", "newPassword", userId)
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
            UserModel.deleteUser("newUsername")
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
            UserModel.register(bandleaderBody.username, bandleaderBody.password, "bandLeader", null)
                     .then(response =>done())
                     .catch(err => console.log(err));
         });
   
         before(done => {
            UserModel.register(clientBody.username, clientBody.password, "client", clientBody.selectedBandleader)
                     .then(response => done())
                     .catch(err => console.log(err));
         })

        it("getClientsForBandleader works", done => {
            UserModel.getClientsForBandleader(bandleaderBody.username)
                    .then(response => {
                        const expectedResponse = { username: "testClient", setlistavailable: false};

                        expect(response[0].username).to.equal(expectedResponse.username);
                        expect(response[0].setlistavailable).to.equal(expectedResponse.setlistavailable);
                        done();
                    })
                    .catch(err => console.log(err));
        });

        after(done => {
            UserModel.deleteUser(bandleaderBody.username)
                     .then(response => done())
                     .catch(err => console.log(err));
         });
   
        after(done => {
            UserModel.deleteUser(clientBody.username)
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
            UserModel.register(userInfo.username, userInfo.password, "client", userInfo.selectedBandleader)
                    .then(response => done())
                    .catch(err => console.log(err));
        });

        it("setClientSetlistAvailability works", done => {
            UserModel.setClientSetlistAvailability(userInfo.username, body.setlistAvailability)
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
            UserModel.deleteUser(userInfo.username)
                     .then(response => done())
                     .catch(err => console.log(err));
         });


    });
    
});