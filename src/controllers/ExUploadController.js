const multer = require('multer');

const MainController = require('../system/MainController');
const MulterHandler = require('../libraries/multer');

const handler = new MulterHandler();

class ExUploadController extends MainController {
    upload = async (req, res, next) => {
        try {
            const message = this.m;
            // condition ternary speerti ini tidak disarankan
            // single 'upload' = nama parameter
            (await handler.upload('gambar')).single('upload')(req, res, function (error) {
                if (error instanceof multer.MulterError) {
                    return next(error);
                } else if (error) {
                    const fullErrorMessage = error.message;
                    const arrFullErrorMessage = fullErrorMessage.split(':');
                    const indexMessage = arrFullErrorMessage[0];
                    if (indexMessage === 'DOCUMENT_TYPE_ERROR' || indexMessage === 'MIME_TYPE_ERROR') {
                        message.code = '100';
                        message.message = arrFullErrorMessage[1];
                        return message.getMessage(res);
                    } else {
                        return next(error);
                    }
                }
                return next();
            });
        } catch (error) {
            this.log.error(`Error ${__filename}`, { errorMessage: error.message, errorStack: error.stack });
            return next(error);
        }
    };

    validate = async (req, res, next) => {
        try {
            const body = req.body;
            // 'upload' sepengetahuan saya tidak di masukkan ke fastest-validator. karena, 'upload' bersifat file
            const schema = {
                nama: { type: 'string' },
                desc_pengalaman: { type: 'string' },
            };

            const check = this.validator.compile(schema);
            const checkResult = check(body);
            const message = this.m;

            if (checkResult === true) {
                next();
            } else {
                message.code = '100';
                message.data = checkResult;
                return message.getMessage(res);
            }
        } catch (error) {
            this.log.error(`Error ${__filename}`, { errorMessage: error.message, errorStack: error.stack });
            return next(error);
        }
    };

    process = async (req, res, next) => {
        try {
            const data = req.body;

            if (!req?.file) {
                this.m.code = '100';
                this.m.message = 'Anda Belum MengUpload File!';
            } else {
                this.m.code = '000';
                this.m.data = { ...data, upload: req.file.path };
                this.m.message = 'Data Successfully!';
            }

            return this.m.getMessage(res);
        } catch (error) {
            this.log.error(`Error ${__filename}`, { errorMessage: error.message, errorStack: error.stack });
            return next(error);
        }
    };
}

module.exports = ExUploadController;
