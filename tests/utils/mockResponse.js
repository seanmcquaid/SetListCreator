const sinon = require("sinon");

const mockResponse = () => {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.send = sinon.stub().returns(res);
  return res;
};

module.exports = mockResponse;
