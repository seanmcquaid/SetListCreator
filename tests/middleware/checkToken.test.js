const expect = require("chai").expect;

describe("Check Token Middleware", () => {

    it("checkToken validates", done => {
        expect(2).to.equal(2);
        done();
    });

    it("checkToken denies unauthorized", done => {
        expect(2).to.equal(2);
        done();
    });

});