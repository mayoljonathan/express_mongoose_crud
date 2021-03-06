const express = require('express');
const { isAuthenticated } = require('../config/passport');
const { UserController } = require('../controllers');

const router = express.Router();

router
  .post('/v1/user', UserController.register)
  .post('/v1/user/login', UserController.login)
  .get('/v1/user/:id', isAuthenticated, UserController.getProfile);

module.exports = router;
