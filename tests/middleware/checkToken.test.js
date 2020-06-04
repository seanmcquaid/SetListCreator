const expect = require("chai").expect;
const sinon = require("sinon");
const checkToken = require("../../middleware/checkToken");
const config = require("../../config/config");
const UsersModel = require("../../models/UsersModel");
const jwt = require("jsonwebtoken");
const mockRequest = require("../utils/mockRequest");
const mockResponse = require("../utils/mockResponse");
const mockNext = require("../utils/mockNext");

describe("Check Token Middleware", () => {

    describe("Check Token Middleware works properly", () => {

        const bandleaderBody = {
            username : "testBandleader",
            password : "testPassword",
         };
   
        let token;

        before(async () => {
            return await UsersModel.register(bandleaderBody.username, bandleaderBody.password, "bandleader", null)
                .then(response => {
                    const specificUserInfo = response[0];
                    const {id, username, accounttype} = specificUserInfo;
                    token = jwt.sign(
                    {
                        id : id,
                        username : username,
                        accountType : accounttype
                    },
                    config.jwtSecret,
                    {expiresIn : 3600000}
                    )
                })
                .catch(err => console.log(err));
        });

        it("checkToken validates correctly", async () => {

            const headers = {
                Authorization : token
            };
    
            const req = mockRequest(headers, {});
            const res = mockResponse();
            const next = mockNext;

            await checkToken(req, res, next);
            
            expect(next.calledOnce).to.equal(true);
        });

        after(async () => await UsersModel.deleteUser(bandleaderBody.username));
    });

    describe("checkToken denies when no token is provided", () => {

        it("checkToken denies unauthorized", async () => {
            const headers = {};
    
            const req = mockRequest(headers, {});
            const res = mockResponse();
            const next = mockNext;

            await checkToken(req, res, next);
            
            expect(res.status.calledWith(401)).to.equal(true);

            const responseBody = {
                errorMessage : "Invalid token"
            };

            expect(res.send.calledWith(responseBody)).to.equal(true);
        });
    });

    describe("checkToken denies for invalid token", () => {

        it("checkToken denies expired token", async () => {
            const headers = {
                Authorization : "fakeToken"
            };
    
            const req = mockRequest(headers, {});
            const res = mockResponse();
            const next = mockNext;

            await checkToken(req, res, next);
            
            expect(res.status.calledWith(401)).to.equal(true);

            const responseBody = {
                errorMessage : "Expired Token"
            };

            expect(res.send.calledWith(responseBody)).to.equal(true);
        });
    });

});