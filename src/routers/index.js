const { Router } = require('express');

const router = Router();

router.use(require('./example'));
router.use(require('./ex-upload'));
router.use(require('./ex-email'));

module.exports = router;
