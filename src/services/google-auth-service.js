const { OAuth2Client } = require('google-auth-library');

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
    throw error;
  }
}

module.exports = {
  getUserEmail,
};
