const express = require('express');
const { isAuthenticated } = require('../config/passport');
const { CommentController } = require('../controllers');

const router = express.Router();

router
  .post('/v1/post/:id/comment', isAuthenticated, CommentController.create)
  .patch('/v1/post/:id/comment/:cid', isAuthenticated, CommentController.update)
  .delete('/v1/post/:id/comment/:cid', isAuthenticated, CommentController.delete);

module.exports = router;
