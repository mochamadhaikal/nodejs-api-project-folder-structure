const { Router } = require('express');

const AuthRoutes = require('../controllers/AuthController');

const router = Router();

const auth = new AuthRoutes();

router.post('/auth', [auth.validate, auth.checkUserdata, auth.createToken, auth.updateAccess, auth.process]);

module.exports = router;
