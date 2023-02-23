const { OAuth2Client } = require("google-auth-library");
const { HTTPError } = require("../errors/HTTPError");

const clientId = process.env.CLIENT_ID;

const client = new OAuth2Client(clientId);

async function getUserEmail(googleToken) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    return payload.email;
  } catch (error) {
    console.log(error);
    throw new HTTPError(
      HttpStatus.INTERNAL_SERVER,
      "Failed to verify google credentials"
    );
  }
}

module.exports = {
  getUserEmail,
};
