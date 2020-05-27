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

        beforeEach(async () => await UsersModel.register(username, password, "client", selectedBandleader));

        it("userExists returns as expected", async () => {
            return await UsersModel.userExists(username)
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
                })
                .catch(err => console.log(err));
        });

        afterEach(async () => await UsersModel.deleteUser(username));
    });

    describe("register", () => {
        const body = {
            username : "testClient1",
            password : "testPassword1",
            selectedBandleader : "fillerbandleader@gmail.com"
         };

        const {username, password, selectedBandleader} = body;

        it("register works", async () => {
            return await UsersModel.register(username, password, "client", selectedBandleader)
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
                })
                .catch(err => console.log(err));
        })

        afterEach(async () => await UsersModel.deleteUser(username));
    });

    describe("getAllBandleaders", () => {

        const body = {
            username : "testBandleader",
            password : "testPassword",
         };

         const {username, password} = body;

        beforeEach(async () => await UsersModel.register(username, password, "bandLeader", null));

        it("getAllBandleaders works", async ()=> {
            return await UsersModel.getAllBandleaders()
                .then(response => {
                    expect(response.length).to.be.greaterThan(0);
                })
                .catch(err => console.log(err));
        });

        afterEach(async () => await UsersModel.deleteUser(username));
    });

    describe("getUserInfo", () => {
        let userId;

        const body = {
            username : "testBandleader",
            password : "testPassword",
         };

        const {username, password} = body;

        beforeEach(async () => {
            return await UsersModel.register(username, password, "bandLeader", null)
                .then(response =>{
                    userId = response[0].id;
                })
                .catch(err => console.log(err));
         });

        it("getUserInfo works", async () => {
            return await UsersModel.getUserInfo(userId)
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
        });

        afterEach(async () => await UsersModel.deleteUser(username));
    });

    describe("editUserInfo", () => {
        let userId;

        const body = {
            username : "testBandleader",
            password : "testPassword",
         };

        const {username, password} = body;

        beforeEach(async () => {
            return await UsersModel.register(username, password, "bandLeader", null)
                .then(response =>{
                    userId = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("editUserInfo works", async () => {
            return await UsersModel.editUserInfo("newUsername", "newPassword", userId)
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
                })
                .catch(err => console.log(err));
        });

        afterEach(async () => await UsersModel.deleteUser("newUsername"));
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

        beforeEach(async () => await UsersModel.register(bandleaderBody.username, bandleaderBody.password, "bandLeader", null));
   
        beforeEach(async () => await UsersModel.register(clientBody.username, clientBody.password, "client", clientBody.selectedBandleader));

        it("getClientsForBandleader works", async () => {
            return await UsersModel.getClientsForBandleader(bandleaderBody.username)
                .then(response => {
                    const expectedResponse = { username: "testClient", setlistavailable: false};

                    expect(response[0].username).to.equal(expectedResponse.username);
                    expect(response[0].setlistavailable).to.equal(expectedResponse.setlistavailable);
                })
                .catch(err => console.log(err));
        });

        afterEach(async () => await UsersModel.deleteUser(bandleaderBody.username));
   
        afterEach(async () => await UsersModel.deleteUser(clientBody.username));
    });

    describe("setClientSetListAvailability", () => {

        const userInfo = {
            username : "testClient",
            password : "testPassword",
            selectedBandleader : "testBandleader"
        };

        const body = {
            setlistAvailability : true
        };

        beforeEach(async () => await UsersModel.register(userInfo.username, userInfo.password, "client", userInfo.selectedBandleader));

        it("setClientSetlistAvailability works", async () => {
            return UsersModel.setClientSetListAvailability(userInfo.username, body.setlistAvailability)
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
                })
                .catch(err => console.log(err));
        });

        afterEach(async () => await UsersModel.deleteUser(userInfo.username));
    });
    
});