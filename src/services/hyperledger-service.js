const fetch = require("node-fetch");
const { HttpStatus } = require("../errors/HttpStatus");
const { HTTPError } = require("../errors/HTTPError");

const hyperledger_service_port = process.env.BRIDGE_PORT;
const hyperledger_service_ip = process.env.HYPERLEDGER_SERVICE_IP;
const hyperledger_service_url = `http://${hyperledger_service_ip}:${hyperledger_service_port}`;

async function registerUser(email) {
  try {
    const body = { userId: email };
    const response = await fetch(`${hyperledger_service_url}/registerUser`, {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const responseBody = await response.json();
      return responseBody;
    }
    throwHttpError(response);
  } catch (error) {
    throw new HTTPError();
  }
}

module.exports = {
  registerUser,
};

function throwHttpError(res) {
  switch (res.status) {
    case HttpStatus.CONFLICT.status:
      throw new HTTPError(
        HttpStatus.CONFLICT,
        "The user is already registered"
      );
    default:
      throw new HTTPError();
  }
}
