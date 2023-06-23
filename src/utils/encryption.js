const encryption = require('crypto');
const SALT = process.env.GATSBY_ENCRYPTION_SALT;
const ENCRYPTION_KEY = process.env.GATSBY_ENCRYPTION_KEY;
const ENCRYPTION_ALGORITHM = process.env.GATSBY_ENCRYPTION_ALGORITHM;

function encrypt(text) {
    const key = encryption.scryptSync(ENCRYPTION_KEY, SALT, 32);
    const iv = encryption.randomBytes(16); // Generate a random IV
    const cipher = encryption.createCipheriv(ENCRYPTION_ALGORITHM, key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return iv.toString('hex') + encrypted;
}

function decrypt(encryptedText) {
    const key = encryption.scryptSync(ENCRYPTION_KEY, SALT, 32);
    const iv = Buffer.from(encryptedText.slice(0, 32), 'hex');
    const decipher = encryption.createDecipheriv(ENCRYPTION_ALGORITHM, key, iv);

    let decrypted = decipher.update(encryptedText.slice(32), 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

module.exports = {
    encrypt,
    decrypt,
};