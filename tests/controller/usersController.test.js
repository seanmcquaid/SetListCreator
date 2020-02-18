const usersController = require("../../controller/usersController");
const expect = require("chai").expect;
const sinon = require("sinon");
const config = require("../../config/config");
const UserModel = require("../../models/UserModel");
const jwt = require("jsonwebtoken");

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

// before(done => {
//     UserModel.register(bandleaderBody.username, bandleaderBody.password, "bandLeader", null)
//             .then(response => {
//                 const specificUserInfo = response[0];
//                 const {id, username, accounttype} = specificUserInfo;
//                 token = jwt.sign(
//                 {
//                     id : id,
//                     username : username,
//                     accountType : accounttype
//                 },
//                 config.jwtSecret,
//                 {expiresIn : 3600000}
//                 )
//                 done();
//             })
//             .catch(err => console.log(err));
// });

// after(done => {
//     UserModel.deleteUser(bandleaderBody.username)
//             .then(response => done())
//             .catch(err => console.log(err));
// });

describe("usersController", () => {

    describe("postRegister - user already exists", () => {

        const bandleaderBody = {
            username : "testBandleader333",
            password : "testPassword",
        };


        before(done => {
            UserModel.register(bandleaderBody.username, bandleaderBody.password, "bandLeader", null)
                  .then(response => done())
                  .catch(err => console.log(err));
        });

        it("postRegister - user already exists", async () => {
            const body = {
                username : "testBandleader333",
                password : "testPassword",
            };

            const params = {
                accountType : "bandLeader"
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
            UserModel.deleteUser(bandleaderBody.username)
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
                accountType : "bandLeader"
            };

            const req = await mockRequest({}, bandleaderBody, params, {});
            const res = await mockResponse();
            const next = mockNext;

            await usersController.postRegister(req, res, next);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.send.calledOnce).to.equal(true);

        });

        afterEach(done => {
            UserModel.deleteUser(bandleaderBody.username)
                    .then(response => done())
                    .catch(err => console.log(err));
        });
    });

    describe("postLogin - user exists", () => {

    });

    describe("postLogin - no user exists", () => {

    });

    describe("postLogin - wrong account type", () => {

    });

    describe("postLogin - wrong password", () => {

    });

    describe("getCheckToken", () => {
        it("getCheckToken", done => {
            expect(2).to.equal(2);
            done();
        });
    });

    describe("getBandleaders", () => {
        it("getBandleaders", done => {
            expect(2).to.equal(2);
            done();
        });
    });

    describe("getClientsForBandleader", () => {
        it("getClientsForBandleader", done => {
            expect(2).to.equal(2);
            done();
        });    
    });

    describe("getUserInfo", () => {
        it("getUserInfo", done => {
            expect(2).to.equal(2);
            done();
        });
    });

    describe("getClientInfo", () => {
        it("getClientInfo", done => {
            expect(2).to.equal(2);
            done();
        });
    });

    describe("editUserInfo - password currently used", () => {
        
    });

    describe("editUserInfo", () => {
        
    });

    describe("sendClientSetlist", () => {
        
    });
    
});