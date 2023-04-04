import express from 'express';

const router = express.Router();

import ExampleController from '../controllers/example-controller';
const example = new ExampleController();
router.get('/ping', [example.ping]);

import AuthRoutes from '../controllers/auth';
const auth = new AuthRoutes();
router.post('/auth', [auth.validate, auth.checkUserdata, auth.createToken, auth.updateAccess, auth.process]);

export default router;
