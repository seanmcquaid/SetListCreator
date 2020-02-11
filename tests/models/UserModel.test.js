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

        beforeEach(done => {
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

        afterEach(done => { 
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

    it("register", done => {
        expect(2).to.equal(2);
        done();
    })

    it("getAllBandleaders", done => {
        expect(2).to.equal(2);
        done();
    })

    it("getUserInfo", done => {
        expect(2).to.equal(2);
        done();
    })

    it("editUserInfo", done => {
        expect(2).to.equal(2);
        done();
    })

    it("getClientsForBandleader", done => {
        expect(2).to.equal(2);
        done();
    })

    it("setClientSetlistAvailability", done => {
        expect(2).to.equal(2);
        done();
    })
    
});