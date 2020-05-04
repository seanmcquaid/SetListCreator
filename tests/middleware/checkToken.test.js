const expect = require("chai").expect;
const sinon = require("sinon");
const checkToken = require("../../middleware/checkToken");
const config = require("../../config/config");
const UsersModel = require("../../models/UsersModel");
const jwt = require("jsonwebtoken");

const mockRequest = (headers, body) => ({
    header : headerName => {
        if(headerName === "Authorization"){
            return headers[headerName];
        }
        return null;
    },
    body
});

const mockResponse = () => {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns(res);
    return res;
};

const mockNext = sinon.stub();

describe("Check Token Middleware", () => {

    describe("", () => {

        const bandleaderBody = {
            username : "testBandleader",
            password : "testPassword",
         };
   
         let token;

        before(done => {
            UsersModel.register(bandleaderBody.username, bandleaderBody.password, "bandleader", null)
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
                     done();
                  })
                  .catch(err => console.log(err));
        });

        it("checkToken validates correctly", done => {

            const headers = {
                Authorization : token
            };
    
            const req = mockRequest(headers, {});
            const res = mockResponse();
            const next = mockNext;

            checkToken(req, res, next);
            
            expect(next.calledOnce).to.equal(true);
            
            done();
        });


        after(done => {
            UsersModel.deleteUser(bandleaderBody.username)
                  .then(response => done())
                  .catch(err => console.log(err));
        });

    });

    describe("checkToken denies when no token is provided", () => {
        it("checkToken denies unauthorized", done => {
            const headers = {};
    
            const req = mockRequest(headers, {});
            const res = mockResponse();
            const next = mockNext;

            checkToken(req, res, next);
            
            expect(res.status.calledWith(401)).to.equal(true);

            const responseBody = {
                errorMessage : "Invalid token"
            };

            expect(res.send.calledWith(responseBody)).to.equal(true);
            
            done();
        });
    });

    describe("checkToken denies for invalid token", () => {
        it("checkToken denies expired token", done => {
            const headers = {
                Authorization : "fakeToken"
            };
    
            const req = mockRequest(headers, {});
            const res = mockResponse();
            const next = mockNext;

            checkToken(req, res, next);
            
            expect(res.status.calledWith(401)).to.equal(true);

            const responseBody = {
                errorMessage : "Expired Token"
            };

            expect(res.send.calledWith(responseBody)).to.equal(true);
            
            done();
        });
    });

});