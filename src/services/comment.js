const { CommentRepository } = require('../repositories');
const PostService = require('./post');
const { ValidationError, NotFoundError, ErrorMapper } = require('../utils/error_handler');

class CommentService {
  static async findOne({ post, commentId }) {
    const comment = await CommentRepository.findOne({ post, commentId });
    if (!comment) throw new NotFoundError('Comment does not exist.');
    if (comment.deletedAt) throw new Error('Comment cannot be found. It may have been deleted.');

    return comment;
  }

  static async create(createCommentDTO) {
    const { error } = createCommentDTO.validate();
    if (error) throw new ValidationError(null, ErrorMapper(error));

    const { postId } = createCommentDTO;
    const post = await PostService.findById(postId);

    await CommentRepository.create({ post, createCommentDTO });
  }

  static async update({ updateCommentDTO, currentUserId }) {
    const { error } = updateCommentDTO.validate();
    if (error) throw new ValidationError(null, ErrorMapper(error));

    const { postId, commentId } = updateCommentDTO;
    const post = await PostService.findById(postId);

    const comment = await this.findOne({ post, commentId, currentUserId });
    if (!comment.author._id.equals(currentUserId)) throw new Error("You can't update others comment.");

    await CommentRepository.update({ post, comment, updateCommentDTO });
  }

  static async delete({ postId, commentId, currentUserId }) {
    const post = await PostService.findById(postId);

    const comment = await this.findOne({ post, commentId, currentUserId });
    if (!comment.author._id.equals(currentUserId)) throw new Error("You can't delete others comment.");

    await CommentRepository.delete({ post, comment });
  }
}

module.exports = CommentService;
