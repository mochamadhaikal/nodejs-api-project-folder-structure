const MainController = require('../system/MainController');
const jwt = require('../lib/jwt');
const ModelAuth = require('../models/AuthModel');

const m_auth = new ModelAuth();

class AuthController extends MainController {
    validate = async (req, res, next) => {
        try {
            //get base64encode basic auth
            const authorization = req.headers.authorization;
            const base64encode = authorization?.split(' ')[1];

            //check is base64encode undefined
            if (base64encode === undefined) {
                this.message.code = '402';
                return this.message.getMessage(res);
            } else {
                // decode base64encode to ascii text
                const rawText = this.util.base64decode(base64encode, 'string');

                //split username & password from decoded text
                const splitText = rawText.split(':');
                const body = {
                    username: splitText[0],
                    password: splitText[1],
                };
                req.body = body;
                return next();
            }
        } catch (error) {
            return next(error);
        }
    };

    checkUserdata = async (req, res, next) => {
        const body = req.body;
        const username = body.username;
        const password = body.password;

        try {
            //get userdata by username
            const getUser = await m_auth.getUserdata(username);
            if (getUser.status === true) {
                const data = getUser.data;
                if (data.length > 0) {
                    const result = data[0];
                    const username = result.username;
                    const db_password = result.password;
                    const client_code = result.client_code;

                    const enc_password = this.util.createHash(`${username}${password}${client_code}`);

                    //compare sha1 password from db with sha1 password from user
                    if (enc_password === db_password) {
                        req.body.userdata = result;
                        return next();
                    } else {
                        this.message.code = '400';
                        this.message.message = 'Username atau password salah!';
                        return this.message.getMessage(res);
                    }
                } else {
                    this.message.code = '400';
                    this.message.message = 'Username atau password salah!';
                    return this.message.getMessage(res);
                }
            } else {
                throw new Error(getUser.message);
            }
        } catch (error) {
            this.log.error(`Error ${__filename}`, {
                errorMessage: error.message,
                errorStack: error.stack,
            });
            return next(error);
        }
    };

    createToken = async (req, res, next) => {
        const body = req.body;
        const userdata = body.userdata;
        const username = userdata.username;
        const client_code = userdata.client_code;
        const client_name = userdata.client_name;
        const status = userdata.status;
        const created_date = userdata.created_date;

        const tokenPayload = {
            client_code: client_code,
            client_name: client_name,
            username: username,
            created_date: created_date,
            status: status,
        };

        //create access token
        try {
            const token = await jwt.sign(tokenPayload);
            if (token !== false) {
                req.body.token = token;
                return next();
            } else {
                throw new Error('Error generate token');
            }
        } catch (error) {
            this.log.error(`Error ${__filename}`, {
                errorMessage: error.message,
                errorStack: error.stack,
            });
            return next(error);
        }
    };

    updateAccess = async (req, res, next) => {
        const body = req.body;
        const userdata = body.userdata;
        const id = userdata.id;

        try {
            //update last access date
            const accessDate = this.util.now('YYYY-MM-DD HH:mm:ss').toString();
            const update = await m_auth.updateUserAccess(id, accessDate);
            if (update.status === true) {
                return next();
            } else {
                throw new Error(update.message);
            }
        } catch (error) {
            this.log.error(`Error ${__filename}`, {
                errorMessage: error.message,
                errorStack: error.stack,
            });
            return next(error);
        }
    };

    process = async (req, res) => {
        const body = req.body;
        const token = body.token;
        const responseData = {
            token: token,
        };

        this.message.code = '000';
        this.message.data = responseData;
        return this.message.getMessage(res);
    };
}

module.exports = AuthController;
