const express = require('express');

const router = express.Router();

router.use(require('./user'));
router.use(require('./post'));
router.use(require('./comment'));
router.use(require('./like'));

module.exports = router;
