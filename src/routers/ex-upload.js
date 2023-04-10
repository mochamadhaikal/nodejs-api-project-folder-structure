const { Router } = require('express');

const ExUploadController = require('../controllers/ExUploadController');

const router = Router();

const exUpload = new ExUploadController();

router.post('/upload', [exUpload.upload, exUpload.validate, exUpload.process]);

module.exports = router;
