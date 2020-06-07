const express = require('express');

const router = express.Router();

router.use(require('./user'));
router.use(require('./post'));
router.use(require('./comment'));

module.exports = router;
