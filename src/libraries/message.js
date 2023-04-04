class Message {
    code = '000';
    data = {};
    success = true;
    message = '';

    constructor() {}

    getMessage = (res = null) => {
        const code = this.code;
        const data = this.data;
        const success = this.code === '000' ? true : false;
        const message = this.message === '' ? this.getDefaultMessage(this.code) : this.message;
        const messageResult = {
            success: success,
            code: code,
            message: message,
            data: data,
        };

        this.clearMessage();

        if (res !== null) {
            return res.send(messageResult);
        }

        return messageResult;
    };

    clearMessage = () => {
        this.code = '000';
        this.data = {};
        this.success = true;
        this.message = '';
    };

    getDefaultMessage = (code) => {
        const messages = {
            //0xx: general request related code
            '000': 'OK',
            '001': 'Invalid request',
            '002': 'Invalid requirement',
            '003': 'Data Unavailable',
            '004': 'Max Request Reached',
            '005': 'Process Aborted',

            //1xx: parameter related code
            100: 'Invalid Parameter',
            101: 'Parameters contained disallowed character',
            102: 'Missing authorization',

            //2xx data related code
            200: 'Data not found',
            201: 'Data has been expired',
            202: 'Validation failed!',
            203: 'Data already exists!',

            //3xx server related code
            300: 'Some error occured, please try again later',
            301: 'Server not ready',

            //4xx authorization related code
            400: 'Missmatch key',
            401: 'Disallowed IP Address',
            402: 'GRANT_ERROR',
            403: 'Token Error',
            404: 'Unauthorized!',
        };

        let result = '';
        if (messages[code] === undefined) {
            result = 'OK!';
        } else {
            result = messages[code];
        }

        return result;
    };
}

module.exports = new Message();
