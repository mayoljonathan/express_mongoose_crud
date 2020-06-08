const express = require('express');
const { isAuthenticated } = require('../config/passport');
const { LikeController } = require('../controllers');

const router = express.Router();

router
  // Like/unlike a post
  .post('/v1/post/:id/like', isAuthenticated, LikeController.create)
  .delete('/v1/post/:id/like', isAuthenticated, LikeController.delete)
  // Like/unlike a comment
  .post('/v1/post/:id/comment/:cid/like', isAuthenticated, LikeController.create)
  .delete('/v1/post/:id/comment/:cid/like', isAuthenticated, LikeController.delete);

module.exports = router;
