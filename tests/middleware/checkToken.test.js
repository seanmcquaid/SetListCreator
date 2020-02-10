const expect = require("chai").expect;
const sinon = require("sinon");
const checkToken = require("../../middleware/checkToken");

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

    it("checkToken validates", done => {
        expect(2).to.equal(2);
        // check that next is called
        
        done();
    });

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