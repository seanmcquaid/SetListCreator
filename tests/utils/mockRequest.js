const mockRequest = (headers, body, params, token) => ({
  header: (headerName) => {
    if (headerName === "Authorization") {
      return headers[headerName];
    }
    return null;
  },
  body,
  params,
  token,
});

module.exports = mockRequest;
