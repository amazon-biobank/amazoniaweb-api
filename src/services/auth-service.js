const jwt = require('jsonwebtoken');

function generateAccessToken(userEmail) {
  return jwt.sign({ 'user-email': userEmail }, process.env.TOKEN_SECRET, {
    expiresIn: 84600,
  });
}

module.exports = {
  generateAccessToken,
};
