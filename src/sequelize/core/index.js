const { Sequelize, DataTypes, QueryTypes } = require('sequelize');

const { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_DIALECT, DB_USER, APPS_STAGE } = process.env;

let log = false;
if (APPS_STAGE === 'dev' || APPS_STAGE === 'development') {
    log = true;
}

//set sequelize global config
const sequelize = new Sequelize({
    dialect: DB_DIALECT,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASS,
    port: DB_PORT,
    username: DB_USER,
    define: {
        freezeTableName: true,
        timestamps: false,
    },
    logging: log ? console.log : log,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    timezone: '+07:00',
    dialectOptions: {
        useUTC: false,
        dateStrings: true,
    },
});

module.exports = { sequelize, QueryTypes, DataTypes };
