const { HttpStatus } = require("./HttpStatus");

class BaseError extends Error {
  name;
  httpCode;

  constructor(name, httpCode, description) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;

    Error.captureStackTrace(this);
  }
}

class HTTPError extends BaseError {
  constructor(
    httpStatus = HttpStatus.INTERNAL_SERVER,
    description = "Internal server error"
  ) {
    super(httpStatus.name, httpStatus.status, description);
  }
}

module.exports = {
  HTTPError,
};
