const { log, m, date, jwt } = require('../libraries');
const { sequelize } = require('../sequelize');

class Middleware {
    constructor() {}

    //throw all error here
    errorHandler = async (err, req, res, next) => {
        m.code = '300';
        log.error(err.message, { errorStack: err.stack });
        return res.send(m.getMessage());
    };

    //check db
    dbAuth = async (req, res, next) => {
        try {
            await sequelize.authenticate();
            return next();
        } catch (error) {
            return next(error);
        }
    };

    invalidRequest = (req, res) => {
        m.code = '001';
        return m.getMessage(res);
    };

    logRequest = (req, res, next) => {
        const method = req.method;
        const path = req.path;
        log.request(`${date.now('DD-MMM-YYYY HH:mm:ss')} (NEW REQUEST) ${method}: ${path} `, {
            body: req.body,
            param: req.params,
            query: req.query,
        });
        console.log(`${date.now('DD-MMM-YYYY HH:mm:ss')} (NEW REQUEST) ${method}: ${path} `);
        return next();
    };

    //check if request contain valid token
    tokenAuth = async (req, res, next) => {
        const authorization = req.headers.authorization;
        const token = authorization?.split(' ')[1];
        if (typeof token === 'undefined') {
            m.code = '403';
            return m.getMessage(res);
        } else {
            const verify = await jwt.verify(token);
            if (verify.status === true) {
                req.body.userdata = verify.payload;
                global.userdata = verify.payload;
                return next();
            } else {
                m.code = '403';
                let responseMessage = verify.message;

                if (verify.message.includes('claim timestamp check failed')) {
                    responseMessage = 'Token has been expired!';
                }

                m.message = responseMessage;
                return m.getMessage(res);
            }
        }
    };
}

module.exports = new Middleware();
