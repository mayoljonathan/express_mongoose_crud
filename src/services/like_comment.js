const { LikeCommentRepository } = require('../repositories');
const PostService = require('./post');
const CommentService = require('./comment');
const { BadParamError } = require('../utils/error_handler');

class LikeCommentService {
  static async create({ postId, commentId, currentUserId }) {
    if (!postId || !commentId) throw new BadParamError();

    const post = await PostService.findById(postId);
    const comment = await CommentService.findOne({ post, commentId });
    const didLike = await LikeCommentRepository.findOne({ comment, currentUserId });
    if (didLike) return false;

    await LikeCommentRepository.create({ post, comment, currentUserId });
    return true;
  }

  static async delete({ postId, commentId, currentUserId }) {
    if (!postId || !commentId) throw new BadParamError();

    const post = await PostService.findById(postId);
    const comment = await CommentService.findOne({ post, commentId });
    const didLike = await LikeCommentRepository.findOne({ comment, currentUserId });
    if (!didLike) return false;

    await LikeCommentRepository.delete({ post, comment, currentUserId });
    return true;
  }
}

module.exports = LikeCommentService;
