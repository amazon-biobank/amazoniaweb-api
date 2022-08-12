const { HTTPError } = require("../errors/HTTPError");
const { HttpStatus } = require("../errors/HttpStatus");
const { EncryptedCertificate } = require("../middleware/EncryptedCertificate");
const { encrypt, generateKeyAndSalt } = require("../middleware/encryption");


function lyra2Encrypt(password, text) {
  try {
    const [keyHash, salt] = generateKeyAndSalt(password);
    const encryptedText = encrypt(keyHash, text);
    const certificate = new EncryptedCertificate(encryptedText, salt);
    return certificate.getObject();
  } catch (error) {
    console.log(error);
    throw new HTTPError(HttpStatus.INTERNAL_SERVER, "Failed to encrypt");
  }
}

module.exports = {
  lyra2Encrypt,
};
