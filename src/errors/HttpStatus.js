const HttpStatus = {
  OK: {
    name: "OK",
    status: 200,
  },
  INTERNAL_SERVER: {
    name: "INTERNAL_SERVER",
    status: 500,
  },
  CONFLICT: {
    name: "CONFLICT",
    status: 409,
  },
};

module.exports = {
  HttpStatus,
};
