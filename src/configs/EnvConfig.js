const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = fs.readFileSync('secret.key', 'utf-8');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    /**
     * Your favorite port
     */
    port: parseInt(process.env.SERVER_PORT, 10),
    hostName: process.env.SERVER_HOSTNAME,

    /**
     * Your basic auth
     */
    basicAuthName: process.env.BASIC_NAME,
    basicAuthKey: process.env.BASIC_KEY,

    awsAccessKey: process.env.AWS_ACCESS_KEY_ID,
    awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsRegion: process.env.AWS_REGION,
    awsBucket: process.env.AWS_BUCKET,

    /**
     * Your secret sauce
     */
    jwtSecret: JWT_SECRET,
    jwtAlgorithm: process.env.JWT_ALGO,
    jwtExpired: process.env.JWT_EXP,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtRefreshAlgorithm: process.env.JWT_REFRESH_ALGO,
    jwtRefreshExpired: process.env.JWT_REFRESH_EXP,
    jwtResetSecret: process.env.JWT_RESET_SECRET,
    jwtResetExpired: process.env.JWT_RESET_EXP,
    jwtActivationSecret: process.env.JWT_ACTIVATION_SECRET,
    jwtActivationExpired: process.env.JWT_ACTIVATION_EXP,

    /**
     * Used by winston logger
     */
    logs: {
        dir: process.env.LOG_DIR || 'log',
        level: process.env.LOG_LEVEL || 'silly',
    },

    /**
     * Sequelize Config
     */
    sequelize: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        pool: {
            max: parseInt(process.env.DB_POOL_MAX || 5),
            min: parseInt(process.env.DB_POOL_MIN || 0),
            acquire: parseInt(process.env.DB_POOL_ACQUIRE || 30000),
            idle: parseInt(process.env.DB_POOL_IDLE || 10000),
        },
    },

    /**
     * Multer Storage
     */
    storage: {
        dir: process.env.STORAGE_DIR,
    },

    /**
     * Encryptor Credentials
     */
    encrypt: {
        secretKey: process.env.SECRET_KEY,
        iv: process.env.IV,
        salt: process.env.PASSWORD_SALT,
        pinSalt: process.env.PIN_SALT,
    },

    /**
     * API configs
     */
    api: {
        prefix: '/api',
    },

    /**
     * email credentials
     */
    email: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        security: process.env.MAIL_SEC,
        username: process.env.MAIL_USER,
        password: process.env.MAIL_PASS,
    },

    /**
     * whatsapp credentials
     */
    whatsapp: {
        endpoint: process.env.WHATSAPP_EP,
        auth: process.env.WHATSAPP_AUTH,
        sender: process.env.WHATSAPP_SENDER,
    },

    /**
     * client host
     */
    client: {
        host: process.env.CLIENT_HOST,
        resetPassword: process.env.CLIENT_RESETPASS,
        activation: process.env.CLIENT_ACTIVATION,
        activationGoogle: process.env.CLIENT_ACTIVATION_GOOGLE,
        activationCorporate: process.env.CLIENT_ACTIVATION_CORPORATE,
    },

    /**
     * Google open API
     */
    google: {
        tokenInfo: process.env.GOOGLE_TOKENINFO,
    },

    /**
     * KBM2
     */
    KBM2: {
        insuranceCode: process.env.KBM2_INSURANCECODE,
        productCode: process.env.KBM2_PRODUCTCODE,
    },

    /**
     * KBM4
     */
    KBM4: {
        insuranceCode: process.env.KBM4_INSURANCECODE,
        productCode: process.env.KBM4_PRODUCTCODE,
    },
};
