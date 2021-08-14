const jwt = require("jsonwebtoken");
const { HTTPError } = require("../errors/HTTPError");
const { HttpStatus } = require("../errors/HttpStatus");

function generateAccessToken(userEmail) {
  try {
    return jwt.sign({ "user-email": userEmail }, process.env.TOKEN_SECRET, {
      expiresIn: 84600,
    });
  } catch (error) {
    throw new HTTPError(
      HttpStatus.INTERNAL_SERVER,
      "Failed to generate access token"
    );
  }
}

module.exports = {
  generateAccessToken,
};
