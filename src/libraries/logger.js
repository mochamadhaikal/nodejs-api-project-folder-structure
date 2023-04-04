const winston = require('winston');
const DailyRotate = require('winston-daily-rotate-file');

const date = require('./date');

const { LOG_DIR, APPS_STAGE } = process.env;

class Logger {
    constructor() {}

    //set daily rotate file format
    getDailyRotate = (level) => {
        const filename = `${LOG_DIR}/${level}/%DATE%.log`;
        const format = winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.printf(({ level, message }) => `[${date.now('HH:mm:ss')}]: ${(level, message)}`)
        );

        return new DailyRotate({
            format,
            filename,
            json: true,
            maxSize: '20m',
            maxFiles: '14d',
            zippedArchive: true,
            datePattern: 'DD-MMM-YYYY',
        });
    };

    //write log base on level
    createLog = (logProps) => {
        const logger = winston.createLogger({
            level: logProps.level,
            transports: [this.getDailyRotate(logProps.level)],
            exitOnError: false,
        });

        if (APPS_STAGE === 'dev' || APPS_STAGE === 'development') {
            console.log(logProps.color, `${logProps.level.toUpperCase()}: ${logProps.message}`);
        }

        return logger;
    };

    //call write log for info level
    info = (message, data) => {
        const write = JSON.stringify({
            message: message,
            data: data,
        });

        const logParam = {
            message: message,
            level: 'info',
            color: '\x1b[36m%s\x1b[0m',
            data,
        };

        const createLog = this.createLog(logParam).info(write);
        createLog.end();
        return true;
    };

    //call write log for info level
    error = (message, data) => {
        const write = JSON.stringify({
            message: message,
            data: data,
        });

        const logParam = {
            message: message,
            level: 'error',
            color: '\x1b[31m%s\x1b[0m',
            data,
        };

        const createLog = this.createLog(logParam).error(write);
        createLog.end();
        return true;
    };

    //call write log for debug level
    debug = (message, data) => {
        const write = JSON.stringify({
            message: message,
            data: data,
        });

        const logParam = {
            message: message,
            level: 'debug',
            color: '\x1b[34m%s\x1b[0m',
            data,
        };

        const createLog = this.createLog(logParam).debug(write);
        createLog.end();
        return true;
    };

    //call write log for warning level
    warning = (message, data) => {
        const write = JSON.stringify({
            message: message,
            data: data,
        });

        const logParam = {
            message: message,
            level: 'warning',
            color: '\x1b[33m%s\x1b[0m',
            data,
        };

        const createLog = this.createLog(logParam).warn(write);
        createLog.end();
        return true;
    };

    request = (message, data) => {
        const write = JSON.stringify({
            message: message,
            data: data,
        });

        const logParam = {
            message: message,
            level: 'request',
            color: '\x1b[36m%s\x1b[0m',
            data,
        };

        const createLog = this.createLog(logParam).info(write);
        createLog.end();
        return true;
    };
}

module.exports = new Logger();
