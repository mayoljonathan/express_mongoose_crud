const express = require('express');
const { isAuthenticated } = require('../config/passport');
const { PostController } = require('../controllers');

const router = express.Router();

router
  .get('/v1/posts', PostController.findAll)
  .post('/v1/post', isAuthenticated, PostController.create)
  .get('/v1/post/:id', PostController.findById)
  .patch('/v1/post/:id', isAuthenticated, PostController.update)
  .delete('/v1/post/:id', isAuthenticated, PostController.delete);

module.exports = router;
