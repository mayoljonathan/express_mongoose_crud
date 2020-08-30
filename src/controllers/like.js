const { LikeCommentService, LikePostService } = require('../services');
const { ResponseHandler } = require('../utils/response_hander');

class LikeController {
  static async create(req, res) {
    try {
      const { id: postId, cid: commentId } = req.params;
      let isSuccess = false;
      if (!commentId) {
        isSuccess = await LikePostService.create({ postId, currentUserId: req.user._id });
      } else {
        isSuccess = await LikeCommentService.create({ postId, commentId, currentUserId: req.user._id });
      }

      res.send(ResponseHandler.success(isSuccess ? 'Liked!' : 'No action happened.'));
    } catch (err) {
      res.status(500).send(ResponseHandler.error(err.message, err));
    }
  }

  static async delete(req, res) {
    try {
      const { id: postId, cid: commentId } = req.params;
      let isSuccess = false;
      if (!commentId) {
        isSuccess = await LikePostService.delete({ postId, currentUserId: req.user._id });
      } else {
        isSuccess = await LikeCommentService.delete({ postId, commentId, currentUserId: req.user._id });
      }

      res.send(ResponseHandler.success(isSuccess ? 'Unliked!' : 'No action happened.'));
    } catch (err) {
      res.status(500).send(ResponseHandler.error(err.message, err));
    }
  }
}

module.exports = LikeController;
