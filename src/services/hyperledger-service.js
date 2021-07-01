const fetch = require('node-fetch');

const hyperledger_service_port =  process.env.BRIDGE_PORT;
const hyperledger_service_ip = process.env.HYPERLEDGER_SERVICE_IP;
const hyperledger_service_url = `http://${hyperledger_service_ip}:${hyperledger_service_port}`

async function registerUser(email) {
  try {
    const body = { userId: email };

    const response = fetch(`${hyperledger_service_url}/registerUser`, {
      method: 'post',
      body:    JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
  })
    .then(res => {
      if(res.ok) {
        return res.json()
        .then(json => json);
      }
      else {
        throw `Error: ${res}`;
      }
    })

    return response;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  registerUser,
};
