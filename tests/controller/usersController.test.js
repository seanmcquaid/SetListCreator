const usersController = require("../../controller/usersController");
const expect = require("chai").expect;
const sinon = require("sinon");
const UsersModel = require("../../models/UsersModel");

const mockRequest = (headers, body, params, token) => ({
    header : headerName => {
        if(headerName === "Authorization"){
            return headers[headerName];
        }
        return null;
    },
    body,
    params,
    token
});

const mockResponse = () => {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns(res);
    return res;
};

const mockNext = sinon.stub();

describe("usersController", () => {

    describe("postRegister - user already exists", () => {

        const bandleaderBody = {
            username : "testBandleader333",
            password : "testPassword",
        };


        beforeEach(done => {
            UsersModel.register(bandleaderBody.username, bandleaderBody.password, "bandleader", null)
                  .then(response => done())
                  .catch(err => console.log(err));
        });

        it("postRegister - user already exists", async () => {
            const body = {
                username : "testBandleader333",
                password : "testPassword",
            };

            const params = {
                accountType : "bandleader"
            };

            const req = await mockRequest({}, body, params, {});
            const res = await mockResponse();
            const next = mockNext;

            await usersController.postRegister(req, res, next);

            const responseBody = {
                errorMessage : "This user has already been registered"
            };

            expect(res.status.calledWith(401)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
            expect(res.send.calledWith(responseBody)).to.equal(true);

        });

        afterEach(done => {
            UsersModel.deleteUser(bandleaderBody.username)
                    .then(response => done())
                    .catch(err => console.log(err));
        });

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

            const req = await mockRequest({}, bandleaderBody, params, {});
            const res = await mockResponse();
            const next = mockNext;

            await usersController.postRegister(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);

        });

        afterEach(done => {
            UsersModel.deleteUser(bandleaderBody.username)
                    .then(response => done())
                    .catch(err => console.log(err));
        });
    });

    describe("postLogin - user exists", () => {

        const bandleaderBody = {
            username : "testBandleader333",
            password : "testPassword",
        };


        beforeEach(done => {
            UsersModel.register(bandleaderBody.username, bandleaderBody.password, "bandleader", null)
                  .then(response => done())
                  .catch(err => console.log(err));
        });

        it("postLogin - user already exists", async () => {

            const body = {
                username : "testBandleader333",
                password : "testPassword",
            };

            const params = {
                accountType : "bandleader"
            };

            const req = await mockRequest({}, body, params, {});
            const res = await mockResponse();
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

            const req = await mockRequest({}, body, params, {});
            const res = await mockResponse();
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

            const req = await mockRequest({}, body, params, {});
            const res = await mockResponse();
            const next = mockNext;

            await usersController.postLogin(req, res, next);

            const responseBody = {
                errorMessage : "Entered password doesn't match our records"
            };

            expect(res.status.calledWith(401)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
            expect(res.send.calledWith(responseBody)).to.equal(true);

        });

        afterEach(done => {
            UsersModel.deleteUser(bandleaderBody.username)
                    .then(response => done())
                    .catch(err => console.log(err));
        });
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

            const req = await mockRequest({}, body, params, {});
            const res = await mockResponse();
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


        beforeEach(done => {
            UsersModel.register(bandleaderBody.username, bandleaderBody.password, "bandleader", null)
                  .then(response => done())
                  .catch(err => console.log(err));
        });

        it("getCheckToken works", async () => {

            const token = {
                username : "testBandleader333"
            };

            const req = await mockRequest({}, {}, {}, token);
            const res = await mockResponse();
            const next = mockNext;

            await usersController.getCheckToken(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);

        });

        afterEach(done => {
            UsersModel.deleteUser(bandleaderBody.username)
                    .then(response => done())
                    .catch(err => console.log(err));
        });
    });

    describe("getBandleaders", () => {
        it("getBandleaders works", async () => {

            const req = await mockRequest({}, {}, {}, {});
            const res = await mockResponse();
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


        beforeEach(done => {
            UsersModel.register(bandleaderBody.username, bandleaderBody.password, "bandleader", null)
                  .then(response => done())
                  .catch(err => console.log(err));
        });

        beforeEach(done => {
            UsersModel.register(clientBody.username, clientBody.password, "client", clientBody.selectedBandleader)
                     .then(response => done())
                     .catch(err => console.log(err));
        });

        it("getClientsForBandleader", async () => {

            const token = {
                username : "testBandleader333"
            };

            const req = await mockRequest({}, {}, {}, token);
            const res = await mockResponse();
            const next = mockNext;

            await usersController.getClientsForBandleader(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);

        });

        afterEach(done => {
            UsersModel.deleteUser(bandleaderBody.username)
                    .then(response => done())
                    .catch(err => console.log(err));
        });  

        afterEach(done => {
            UsersModel.deleteUser(clientBody.username)
                    .then(response => done())
                    .catch(err => console.log(err));
        });

    });

    describe("getUserInfo", () => {
        let id;

        const bandleaderBody = {
            username : "testBandleader333",
            password : "testPassword",
        };


        beforeEach(done => {
            UsersModel.register(bandleaderBody.username, bandleaderBody.password, "bandleader", null)
                  .then(response => {
                      id = response[0].id
                      done();
                    })
                  .catch(err => console.log(err));
        });

        it("getUserInfo", async () => {

            const token = {
                id
            };

            const req = await mockRequest({}, {}, {}, token);
            const res = await mockResponse();
            const next = mockNext;

            await usersController.getUserInfo(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);

        });

        afterEach(done => {
            UsersModel.deleteUser(bandleaderBody.username)
                    .then(response => done())
                    .catch(err => console.log(err));
        });
    });

    describe("getClientInfo", () => {

        let clientId;

        const clientBody = {
            username : "testClient",
            password : "testPassword",
            selectedBandleader : "testBandleader333"
         };


        beforeEach(done => {
            UsersModel.register(clientBody.username, clientBody.password, "client", null)
                  .then(response => {
                      clientId = response[0].id;
                      done();
                    })
                  .catch(err => console.log(err));
        });

        it("getClientInfo", async () => {

            const params = {
                clientId
            };

            const req = await mockRequest({}, {}, params,{});
            const res = await mockResponse();
            const next = mockNext;

            await usersController.getUserInfo(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);

        });

        afterEach(done => {
            UsersModel.deleteUser(clientBody.username)
                    .then(response => done())
                    .catch(err => console.log(err));
        });
    });

    describe("editUserInfo - password currently used ", () => {
        let id;

        const bandleaderBody = {
            username : "testBandleader333",
            password : "testPassword",
        };


        beforeEach(done => {
            UsersModel.register(bandleaderBody.username, bandleaderBody.password, "bandleader", null)
                  .then(response => {
                      id = response[0].id
                      done();
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

            const req = await mockRequest({}, body, {}, token);
            const res = await mockResponse();
            const next = mockNext;

            await usersController.editUserInfo(req, res, next);

            const responseBody = {
                errorMessage : "The new password is presently being used"
            };

            expect(res.status.calledWith(401)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
            expect(res.send.calledWith(responseBody)).to.equal(true);

        });

        afterEach(done => {
            UsersModel.deleteUser(bandleaderBody.username)
                    .then(response => done())
                    .catch(err => console.log(err));
        });

    });

    describe("editUserInfo", () => {
        let id;

        const bandleaderBody = {
            username : "testBandleader333",
            password : "testPassword",
        };


        beforeEach(done => {
            UsersModel.register(bandleaderBody.username, bandleaderBody.password, "bandleader", null)
                  .then(response => {
                      id = response[0].id
                      done();
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

            const req = await mockRequest({}, body, {}, token);
            const res = await mockResponse();
            const next = mockNext;

            await usersController.editUserInfo(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);

        });

        afterEach(done => {
            UsersModel.deleteUser(bandleaderBody.username)
                    .then(response => done())
                    .catch(err => console.log(err));
        });
        
    });

    describe("sendClientSetlist", () => {
        const clientBody = {
            username : "testClient",
            password : "testPassword",
            selectedBandleader : "testBandleader333"
        };

        beforeEach(done => {
            UsersModel.register(clientBody.username, clientBody.password, "client", clientBody.selectedBandleader)
                     .then(response => done())
                     .catch(err => console.log(err));
        });

        it("sendClientSetlist", async () => {

            const token = {
                username : clientBody.username
            };

            const body = {
                setlistAvailability : true
            };
            
            const req = await mockRequest({}, body, {}, token);
            const res = await mockResponse();
            const next = mockNext;

            await usersController.sendClientSetlist(req, res, next);

            console.log(res.status.calledWith(200), "test");
            console.log(res.send.calledOnce)

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);
        });

        afterEach(done => {
            UsersModel.deleteUser(clientBody.username)
                    .then(response => done())
                    .catch(err => console.log(err));
        });
    });
    
});