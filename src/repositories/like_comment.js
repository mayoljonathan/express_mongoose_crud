class LikeCommentRepository {
  findOne({ comment, currentUserId }) {
    if (comment.likes.length === 0) return null;

    return comment.likes.some((user) => user._id.equals(currentUserId));
  }

  create({ post, comment, currentUserId }) {
    comment.likes.push(currentUserId);

    return post.save();
  }

  delete({ post, comment, currentUserId }) {
    const index = comment.likes.indexOf(currentUserId);

    comment.likes.splice(index, 1);
    return post.save();
  }
}

module.exports = new LikeCommentRepository();
