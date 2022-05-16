const util = require("util");
const { HTTPError } = require("../errors/HTTPError");
const { HttpStatus } = require("../errors/HttpStatus");
const exec = util.promisify(require("child_process").exec);

async function lyra2Encrypt(password, text) {
  try {
    const execString = `lyra2-file-encryptor encrypt '${password}' '${text}'`
    const { stdout, stderr } = await exec(
      execString
    );
    if (stderr) {
      throw new Error(stderr);
    }
    return stdout;
  } catch (error) {
    console.log(error);
    throw new HTTPError(HttpStatus.INTERNAL_SERVER, "Failed to encrypt");
  }
}

module.exports = {
  lyra2Encrypt,
};
