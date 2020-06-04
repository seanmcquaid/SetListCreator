const UsersModel = require("../../models/UsersModel");
const expect = require("chai").expect;

describe("UsersModel", () => {

    describe("userExists", () => {
        const userInfo = {
            username : "testClient",
            password : "testPassword",
            selectedBandleader : "fillerbandleader@gmail.com"
         };

        const {username, password, selectedBandleader} = userInfo;

        before(async () => await UsersModel.register(username, password, "client", selectedBandleader));

        it("userExists returns as expected", async () => {
            return await UsersModel.userExists(username)
                .then(response => {
                    const expectedResponse = { 
                        username: "testClient",
                        accountType: "client",
                        bandleaderName: "fillerbandleader@gmail.com",
                        setlistAvailable: false 
                    };

                    const userInfoResponse = response[0];

                    expect(userInfoResponse.username).to.equal(expectedResponse.username);
                    expect(userInfoResponse.accounttype).to.equal(expectedResponse.accountType);
                    expect(userInfoResponse.bandleadername).to.equal(expectedResponse.bandleaderName);
                    expect(userInfoResponse.setlistavailable).to.equal(expectedResponse.setlistAvailable);
                })
                .catch(err => console.log(err));
        });

        after(async () => await UsersModel.deleteUser(username));
    });

    describe("register", () => {
        const userInfo = {
            username : "testClient1",
            password : "testPassword1",
            selectedBandleader : "fillerbandleader@gmail.com"
        };

        const {username, password, selectedBandleader} = userInfo;

        it("register works", async () => {
            return await UsersModel.register(username, password, "client", selectedBandleader)
                .then(response => {
                    const expectedResponse = { 
                        username: "testClient1",
                        accountType: "client",
                        bandleaderName: "fillerbandleader@gmail.com",
                        setlistAvailable: false 
                    };

                    const userInfoResponse = response[0];

                    expect(userInfoResponse.username).to.equal(expectedResponse.username);
                    expect(userInfoResponse.accounttype).to.equal(expectedResponse.accountType);
                    expect(userInfoResponse.bandleadername).to.equal(expectedResponse.bandleaderName);
                    expect(userInfoResponse.setlistavailable).to.equal(expectedResponse.setlistAvailable);
                })
                .catch(err => console.log(err));
        })

        after(async () => await UsersModel.deleteUser(username));
    });

    describe("getAllBandleaders", () => {

        const userInfo = {
            username : "testBandleader",
            password : "testPassword",
        };

        const {username, password} = userInfo;

        before(async () => await UsersModel.register(username, password, "bandLeader", null));

        it("getAllBandleaders works", async ()=> {
            return await UsersModel.getAllBandleaders()
                .then(response => {
                    expect(response.length).to.be.greaterThan(0);
                })
                .catch(err => console.log(err));
        });

        after(async () => await UsersModel.deleteUser(username));
    });

    describe("getUserInfo", () => {
        let userId;

        const userInfo = {
            username : "testBandleader",
            password : "testPassword",
         };

        const {username, password} = userInfo;

        before(async () => {
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
                    
                    const userInfoResponse = response[0];

                    expect(userInfoResponse.username).to.equal(expectedResponse.username);
                    expect(userInfoResponse.accounttype).to.equal(expectedResponse.accounttype);
                    expect(userInfoResponse.bandleadername).to.equal(expectedResponse.bandleadername);
                    expect(userInfoResponse.setlistavailable).to.equal(expectedResponse.setlistavailable);
                })
                .catch(err => console.log(err));
        });

        after(async () => await UsersModel.deleteUser(username));
    });

    describe("editUserInfo", () => {
        let userId;

        const body = {
            username : "testBandleader",
            password : "testPassword",
         };

        const {username, password} = body;

        before(async () => {
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

                    const userInfoResponse = response[0];

                    expect(userInfoResponse.username).to.equal(expectedResponse.username);
                    expect(userInfoResponse.accounttype).to.equal(expectedResponse.accounttype);
                    expect(userInfoResponse.bandleadername).to.equal(expectedResponse.bandleadername);
                    expect(userInfoResponse.setlistavailable).to.equal(expectedResponse.setlistavailable);
                })
                .catch(err => console.log(err));
        });

        after(async () => await UsersModel.deleteUser("newUsername"));
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

        before(async () => await UsersModel.register(bandleaderBody.username, bandleaderBody.password, "bandLeader", null));
   
        before(async () => await UsersModel.register(clientBody.username, clientBody.password, "client", clientBody.selectedBandleader));

        it("getClientsForBandleader works", async () => {
            return await UsersModel.getClientsForBandleader(bandleaderBody.username)
                .then(response => {
                    const expectedResponse = { username: "testClient", setlistavailable: false};

                    const userInfoResponse = response[0];

                    expect(userInfoResponse.username).to.equal(expectedResponse.username);
                    expect(userInfoResponse.setlistavailable).to.equal(expectedResponse.setlistavailable);
                })
                .catch(err => console.log(err));
        });

        after(async () => await UsersModel.deleteUser(bandleaderBody.username));
   
        after(async () => await UsersModel.deleteUser(clientBody.username));
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

        before(async () => await UsersModel.register(userInfo.username, userInfo.password, "client", userInfo.selectedBandleader));

        it("setClientSetlistAvailability works", async () => {
            return UsersModel.setClientSetListAvailability(userInfo.username, body.setlistAvailability)
                .then(response => {
                    const expectedResponse = { 
                        username: "testClient",
                        accounttype: "client",
                        bandleadername: "testBandleader",
                        setlistavailable: true 
                    };

                    const userInfoResponse = response[0];

                    expect(userInfoResponse.username).to.equal(expectedResponse.username);
                    expect(userInfoResponse.accounttype).to.equal(expectedResponse.accounttype);
                    expect(userInfoResponse.bandleadername).to.equal(expectedResponse.bandleadername);
                    expect(userInfoResponse.setlistavailable).to.equal(expectedResponse.setlistavailable);
                })
                .catch(err => console.log(err));
        });

        after(async () => await UsersModel.deleteUser(userInfo.username));
    });
    
});