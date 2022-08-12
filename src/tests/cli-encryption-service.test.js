const { lyra2Encrypt } = require('../services/cli-encryption-service')
const { decrypt, generateKey } = require("../middleware/encryption");


test('Encrypts a file with a password with Lyra2 hashing scheme', () => {
    const password = "password_test";
    const plainText = "Test Text";
    const amazonCertificate = lyra2Encrypt(password, plainText);
    console.log({ amazonCertificate });
    const salt = amazonCertificate['salt']
    const key = generateKey(password, salt);
    const encrypted = amazonCertificate['encrypted_content'];
    const decrypted = decrypt(key, encrypted);
    console.log({decrypted});
    expect(decrypted === plainText);
});
