const CryptoJS = require('crypto-js');
const Crypto = require('crypto');
const EnvConfig = require('../configs/EnvConfig');

class Secret {
    generatePassword(password) {
        return CryptoJS.SHA1(`${password}${EnvConfig.encrypt.salt}`).toString();
    }

    generatePin(pin) {
        return CryptoJS.SHA1(`${pin}${EnvConfig.encrypt.pinSalt}`).toString();
    }

    aesEncrypt(text) {
        const cipher = Crypto.createCipheriv('aes-256-ctr', EnvConfig.encrypt.secretKey, EnvConfig.encrypt.iv);
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
        return encrypted.toString('hex');
    }

    aesDecrypt(encryptedText) {
        const decipher = Crypto.createDecipheriv('aes-256-ctr', EnvConfig.encrypt.secretKey, EnvConfig.encrypt.iv);
        const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedText, 'hex')), decipher.final()]);
        return decrypted.toString();
    }
}

module.exports = new Secret();
