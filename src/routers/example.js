const express = require('express');
const ExampleController = require('../controllers/ExampleController');
const ExEmailController = require('../controllers/ExEmailController');

const router = express.Router();

const example = new ExampleController();
const exmail = new ExEmailController();

router.post('/', [example.validate, example.process]);

router.get('/ping', [example.ping]);

router.get('/error', [example.err]);

router.post('/mail', [exmail.generateEmail]);

module.exports = router;
