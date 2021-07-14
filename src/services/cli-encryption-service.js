const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function lyra2Encrypt(password, text) {
  const { stdout, stderr } = await exec(`lyra2-file-encryptor encrypt "${password}" "${text}"`);
  if(stderr){
      throw new Error(stderr);
  }
  return stdout
}

module.exports = {
    lyra2Encrypt,
};