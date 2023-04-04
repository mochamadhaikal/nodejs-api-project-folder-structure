const fs = require('fs');
const jose = require('jose');
// import * as jose from 'jose';
const log = require('./logger');
//read secret key
const secretKey = fs.readFileSync('secret.key', 'utf-8');
//JWT option
const option = {
    alg: 'dir',
    issuer: 'PT Mencari Cinta Sejati',
    audience: process.env.CHANNEL_CLIENT_NAME,
    expired: '2h',
};

class JWT {
    //jwt signing method
    sign = async (payload) => {
        try {
            //encode secretKey string to buffer
            const secret = new TextEncoder().encode(secretKey);
            const time = new Date().getTime();
            //signing payload as JWT
            const jwt = await new jose.EncryptJWT(payload)
                .setProtectedHeader({
                    alg: option.alg,
                    enc: 'A256GCM',
                })
                .setIssuedAt(time)
                .setIssuer(option.issuer)
                .setAudience(option.audience)
                .setExpirationTime(option.expired)
                .encrypt(secret);

            return jwt;
        } catch (error) {
            log.error('Error signing jwt', {
                errorMessage: error.message,
                errorStack: error.stack,
                payload: payload,
                option: option,
                secretKey: secretKey,
            });
            return false;
        }
    };

    verify = async (token) => {
        let result = {
            status: true,
            payload: {},
            message: 'OK',
        };

        try {
            //encode secretKey string to buffer
            const secret = new TextEncoder().encode(secretKey);

            //verify token
            const { payload } = await jose.jwtDecrypt(token, secret, {
                issuer: option.issuer,
                audience: option.audience,
                contentEncryptionAlgorithms: ['A256GCM'],
                keyManagementAlgorithms: ['dir'],
            });

            result.payload = payload;
        } catch (error) {
            log.error('Error verify jwt', {
                errorMessage: error.message,
                errorStack: error.stack,
                token: token,
                secretKey: secretKey,
            });
            result.status = false;
            result.message = error.message;
        }

        return result;
    };
}

module.exports = new JWT();
