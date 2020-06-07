const { CreateCommentDTO, UpdateCommentDTO } = require('../dtos');
const { CommentService } = require('../services');
const { ValidationError } = require('../utils/error_handler');
const { ResponseHandler } = require('../utils/response_hander');

class CommentController {
  static async create(req, res) {
    try {
      const { id: postId } = req.params;
      const { body } = req.body;
      const createCommentDTO = new CreateCommentDTO({
        postId,
        body,
        author: req.user._id,
      });

      const result = await CommentService.create(createCommentDTO);

      res.send(ResponseHandler.success('Commented successfully!', result));
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.send(ResponseHandler.fail(null, err));
      }
      res.send(ResponseHandler.error(err.message, err));
    }
  }

  static async update(req, res) {
    try {
      const { id: postId, cid: commentId } = req.params;
      const { body } = req.body;
      const updateCommentDTO = new UpdateCommentDTO({
        postId,
        commentId,
        body,
        author: req.user._id,
      });

      await CommentService.update({ updateCommentDTO, currentUserId: req.user._id });

      res.send(ResponseHandler.success('Your comment has been updated!'));
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.send(ResponseHandler.fail(null, err));
      }
      res.send(ResponseHandler.error(err.message, err));
    }
  }

  static async delete(req, res) {
    try {
      const { id: postId, cid: commentId } = req.params;
      await CommentService.delete({ postId, commentId, currentUserId: req.user._id });

      res.send(ResponseHandler.success('Your comment has been deleted!'));
    } catch (err) {
      res.send(ResponseHandler.error(err.message, err));
    }
  }
}

module.exports = CommentController;
