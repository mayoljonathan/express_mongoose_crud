const mongoose = require('mongoose');
const { Comment } = require('../models');

class CommentRepository {
  constructor(model) {
    this.model = model;
  }

  async findOne({ post, commentId }) {
    // If not a valid id, then return null, because there will be no comment saved in db since it isn't a ObjectId from mongoose
    if (!mongoose.Types.ObjectId.isValid(commentId)) return null;

    return post.comments.id(commentId);
  }

  create({ post, createCommentDTO }) {
    const { body, author } = createCommentDTO;

    const Model = this.model;
    const comment = new Model({ body, author });
    post.comments.push(comment);
    return post.save();
  }

  update({ post, comment, updateCommentDTO }) {
    const { body } = updateCommentDTO;
    const commentModel = comment;

    commentModel.body = body;

    return post.save();
  }

  delete({ post, comment }) {
    // Soft delete the comment
    const commentModel = comment;
    commentModel.deletedAt = Date.now();

    return post.save();
  }
}

module.exports = new CommentRepository(Comment);
