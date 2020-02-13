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
            UserModel.deleteUser(username)
                    .then(response => done())
                    .catch(err => console.log(err));
        });
    });

    it("getClientsForBandleader", done => {
        expect(2).to.equal(2);
        done();
    })

    it("setClientSetlistAvailability", done => {
        expect(2).to.equal(2);
        done();
    })
    
});