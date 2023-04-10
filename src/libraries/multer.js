const fs = require('fs');
const multer = require('multer');
// const util = require('./utility');

class MulterHandler {
    #pdfStorage = multer.diskStorage({
        destination: function (req, file, cb) {
            const dir = process.env.DIR_STORAGE;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            cb(null, dir);
        },
        filename: function (req, file, cb) {
            const body = req.body;
            const filename = file.originalname;
            const arrFilename = filename.split('.');
            const ext = arrFilename[arrFilename.length - 1];
            //detail file dan agen yang diupload
            const nama = body.nama;
            // const id = util.uuid();
            const date = new Date().getTime();

            //prefix filename baru
            let newFilename = `${nama}_${date}.${ext}`;
            cb(null, newFilename);
        },
    });

    #gambarStorage = multer.diskStorage({
        destination: function (req, file, cb) {
            const dir = process.env.DIR_STORAGE;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            cb(null, dir);
        },
        filename: function (req, file, cb) {
            const body = req.body;
            const filename = file.originalname;
            const arrFilename = filename.split('.');
            const ext = arrFilename[arrFilename.length - 1];
            //detail file dan polis yang diupload
            const nama = body.nama;
            // const id = util.uuid();
            const date = new Date().getTime();

            //prefix filename baru
            let newFilename = `${nama}_${date}.${ext}`;
            cb(null, newFilename);
        },
    });

    upload = async (storageType) => {
        let storage;
        switch (storageType.toUpperCase()) {
            case 'GAMBAR':
                storage = this.#gambarStorage;
                break;
            case 'PDF':
                storage = this.#pdfStorage;
                break;
            default:
                storage = this.#gambarStorage;
                break;
        }

        const up = multer({
            storage: storage,
            limits: {
                fileSize: 5 * 1000 ** 2,
            },
            fileFilter(req, file, cb) {
                const mimeType = file.mimetype;
                if (mimeType.includes('pdf') || mimeType.includes('image')) {
                    cb(null, true);
                } else {
                    cb(new Error('MIME_TYPE_ERROR:Expected file image or pdf'));
                }
            },
        });

        return up;
    };
}

module.exports = MulterHandler;
