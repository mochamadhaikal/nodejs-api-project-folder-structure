const { Router } = require('express');

const ExampleController = require('../controllers/ExampleController');

const router = Router();

const example = new ExampleController();

router.post('/', [example.validate, example.process]);
router.get('/ping', [example.ping]);
router.get('/error', [example.err]);

module.exports = router;
