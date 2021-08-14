const { HTTPError } = require("../errors/HTTPError");

function httpErrorHandler(err, req, res, next) {
  if (err instanceof HTTPError) {
    res.status(err.httpCode).send(err.message);
  }
  next(err);
}

module.exports = httpErrorHandler;
