const usersController = require("../../controllers/usersController");
const expect = require("chai").expect;
const UsersModel = require("../../models/UsersModel");
const mockRequest = require("../utils/mockRequest");
const mockResponse = require("../utils/mockResponse");
const mockNext = require("../utils/mockNext");


describe("usersController", () => {

    describe("postRegister - user already exists", () => {

        const bandleaderBody = {
            username : "testBandleader333",
            password : "testPassword",
        };


        before(async () => await UsersModel.register(bandleaderBody.username, bandleaderBody.password, "bandleader", null));

        it("postRegister - user already exists", async () => {
            const body = {
                username : "testBandleader333",
                password : "testPassword",
            };

            const params = {
                accountType : "bandleader"
            };

            const req = mockRequest({}, body, params, {});
            const res = mockResponse();
            const next = mockNext;

            await usersController.postRegister(req, res, next);

            const responseBody = {
                errorMessage : "This user has already been registered"
            };

            expect(res.status.calledWith(401)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
            expect(res.send.calledWith(responseBody)).to.equal(true);
        });

        after(async () => await UsersModel.deleteUser(bandleaderBody.username));

    });

    describe("postRegister - no user already exists", () => {

        const bandleaderBody = {
            username : "testBandleader333",
            password : "testPassword",
        };

        it("postRegister - no user already exists", async () => {

            const params = {
                accountType : "bandleader"
            };

            const req = mockRequest({}, bandleaderBody, params, {});
            const res = mockResponse();
            const next = mockNext;

            await usersController.postRegister(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
        });

        after(async () => await UsersModel.deleteUser(bandleaderBody.username));
    });

    describe("postLogin - user exists", () => {

        const bandleaderBody = {
            username : "testBandleader333",
            password : "testPassword",
        };

        before(async () => await UsersModel.register(bandleaderBody.username, bandleaderBody.password, "bandleader", null));

        it("postLogin - user already exists", async () => {

            const body = {
                username : "testBandleader333",
                password : "testPassword",
            };

            const params = {
                accountType : "bandleader"
            };

            const req = mockRequest({}, body, params, {});
            const res = mockResponse();
            const next = mockNext;

            await usersController.postLogin(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);

        });

        it("postLogin - wrong account type", async () => {

            const body = {
                username : "testBandleader333",
                password : "testPassword",
            };

            const params = {
                accountType : "client"
            };

            const req = mockRequest({}, body, params, {});
            const res = mockResponse();
            const next = mockNext;

            await usersController.postLogin(req, res, next);

            const responseBody = {
                errorMessage : "Wrong account type for this user!"
            };

            expect(res.status.calledWith(401)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
            expect(res.send.calledWith(responseBody)).to.equal(true);

        });

        it("postLogin - wrong password", async () => {

            const body = {
                username : "testBandleader333",
                password : "testPassword333",
            };

            const params = {
                accountType : "bandleader"
            };

            const req = mockRequest({}, body, params, {});
            const res = mockResponse();
            const next = mockNext;

            await usersController.postLogin(req, res, next);

            const responseBody = {
                errorMessage : "Entered password doesn't match our records"
            };

            expect(res.status.calledWith(401)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
            expect(res.send.calledWith(responseBody)).to.equal(true);

        });

        after(async () => await UsersModel.deleteUser(bandleaderBody.username));
    });

    describe("postLogin - no user exists", () => {

        it("postLogin - no user exists ", async () => {

            const body = {
                username : "testBandleader333",
                password : "testPassword",
            };

            const params = {
                accountType : "bandleader"
            };

            const req = mockRequest({}, body, params, {});
            const res = mockResponse();
            const next = mockNext;

            await usersController.postLogin(req, res, next);

            const responseBody = {
                errorMessage : "This user isn't registered on our site!"
            };

            expect(res.status.calledWith(401)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
            expect(res.send.calledWith(responseBody)).to.equal(true);
        });
    });

    describe("getCheckToken", () => {

        const bandleaderBody = {
            username : "testBandleader333",
            password : "testPassword",
        };


        before(async () => await UsersModel.register(bandleaderBody.username, bandleaderBody.password, "bandleader", null));

        it("getCheckToken works", async () => {

            const token = {
                username : "testBandleader333"
            };

            const req = mockRequest({}, {}, {}, token);
            const res = mockResponse();
            const next = mockNext;

            await usersController.getCheckToken(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);

        });

        after(async () => await UsersModel.deleteUser(bandleaderBody.username));
    });

    describe("getBandleaders", () => {
        it("getBandleaders works", async () => {

            const req = mockRequest({}, {}, {}, {});
            const res = mockResponse();
            const next = mockNext;

            await usersController.getBandleaders(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
        });
    });

    describe("getClientsForBandleader", () => {
        const bandleaderBody = {
            username : "testBandleader333",
            password : "testPassword",
        };

        const clientBody = {
            username : "testClient",
            password : "testPassword",
            selectedBandleader : "testBandleader333"
         };


        before(async () => await UsersModel.register(bandleaderBody.username, bandleaderBody.password, "bandleader", null));

        before(async () => await UsersModel.register(clientBody.username, clientBody.password, "client", clientBody.selectedBandleader));

        it("getClientsForBandleader", async () => {

            const token = {
                username : "testBandleader333"
            };

            const req = mockRequest({}, {}, {}, token);
            const res = mockResponse();
            const next = mockNext;

            await usersController.getClientsForBandleader(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
        });

        after(async () => await UsersModel.deleteUser(bandleaderBody.username));  

        after(async () => await UsersModel.deleteUser(clientBody.username));
    });

    describe("getUserInfo", () => {
        let id;

        const bandleaderBody = {
            username : "testBandleader333",
            password : "testPassword",
        };


        before(async () => {
            return await UsersModel.register(bandleaderBody.username, bandleaderBody.password, "bandleader", null)
                .then(response => {
                    id = response[0].id
                })
                .catch(err => console.log(err));
        });

        it("getUserInfo", async () => {

            const token = {
                id
            };

            const req = mockRequest({}, {}, {}, token);
            const res = mockResponse();
            const next = mockNext;

            await usersController.getUserInfo(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
        });

        after(async () => await UsersModel.deleteUser(bandleaderBody.username));
    });

    describe("getClientInfo", () => {

        let clientId;

        const clientBody = {
            username : "testClient",
            password : "testPassword",
            selectedBandleader : "testBandleader333"
         };


        before(async () => {
            return await UsersModel.register(clientBody.username, clientBody.password, "client", null)
                .then(response => {
                    clientId = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("getClientInfo", async () => {

            const params = {
                clientId
            };

            const req = mockRequest({}, {}, params,{});
            const res = mockResponse();
            const next = mockNext;

            await usersController.getUserInfo(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);

        });

        after(async () => await UsersModel.deleteUser(clientBody.username));
    });

    describe("editUserInfo - password currently used ", () => {
        let id;

        const bandleaderBody = {
            username : "testBandleader333",
            password : "testPassword",
        };


        before(async () => {
            return await UsersModel.register(bandleaderBody.username, bandleaderBody.password, "bandleader", null)
                .then(response => {
                    id = response[0].id
                })
                .catch(err => console.log(err));
        });

        it("editUserInfo - password currently used", async () => {

            const token = {
                id
            };

            const body = {
                newUsername : "testBandleader321",
                newPassword : "testPassword"
            };

            const req = mockRequest({}, body, {}, token);
            const res = mockResponse();
            const next = mockNext;

            await usersController.editUserInfo(req, res, next);

            const responseBody = {
                errorMessage : "The new password is presently being used"
            };

            expect(res.status.calledWith(401)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
            expect(res.send.calledWith(responseBody)).to.equal(true);
        });

        after(async () => await UsersModel.deleteUser(bandleaderBody.username));
    });

    describe("editUserInfo", () => {
        let id;

        const bandleaderBody = {
            username : "testBandleader333",
            password : "testPassword",
        };


        before(async () => {
            return await UsersModel.register(bandleaderBody.username, bandleaderBody.password, "bandleader", null)
                .then(response => {
                    id = response[0].id
                })
                .catch(err => console.log(err));
        });

        it("editUserInfo success", async () => {

            const token = {
                id
            };

            const body = {
                newUsername : "testBandleader333",
                newPassword : "testPassword321"
            };

            const req = mockRequest({}, body, {}, token);
            const res = mockResponse();
            const next = mockNext;

            await usersController.editUserInfo(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
        });

        after(async () => await UsersModel.deleteUser(bandleaderBody.username));
    });

    describe("sendClientSetlist", () => {
        const clientBody = {
            username : "testClient",
            password : "testPassword",
            selectedBandleader : "testBandleader333"
        };

        before(async () => await UsersModel.register(clientBody.username, clientBody.password, "client", clientBody.selectedBandleader));

        it("sendClientSetlist", async () => {

            const token = {
                username : clientBody.username
            };

            const body = {
                setlistAvailability : true
            };
            
            const req = mockRequest({}, body, {}, token);
            const res = mockResponse();
            const next = mockNext;

            await usersController.sendClientSetList(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
        });

        after(async () => await UsersModel.deleteUser(clientBody.username));
    });
    
});