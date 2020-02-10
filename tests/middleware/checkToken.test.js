const expect = require("chai").expect;
const sinon = require("sinon");
const checkToken = require("../../middleware/checkToken");
const config = require("../../config/config");
const UserModel = require("../../models/UserModel");
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
            UserModel.register(bandleaderBody.username, bandleaderBody.password, "bandLeader", null)
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
            UserModel.deleteUser(bandleaderBody.username)
                  .then(response => done())
                  .catch(err => console.log(err));
        });

    })

    it("checkToken denies unauthorized", done => {
        // create jwt with invalid user info or user that doesnt exist 
        expect(2).to.equal(2);
        done();
    });

    it("checkToken denies expired token", done => {
        // figure out how to produce an expired token for testing
        expect(2).to.equal(2);
        done();
    });

});