const { Router } = require('express');

const ExEmailController = require('../controllers/ExEmailController');

const router = Router();

const exmail = new ExEmailController();

router.post('/mail', [exmail.generateEmail]);

module.exports = router;
