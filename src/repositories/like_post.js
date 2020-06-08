class LikePostRepository {
  findOne({ post, currentUserId }) {
    if (post.likes.length === 0) return null;

    return post.likes.some((user) => user._id.equals(currentUserId));
  }

  create({ post, currentUserId }) {
    post.likes.push(currentUserId);

    return post.save();
  }

  delete({ post, currentUserId }) {
    const index = post.likes.indexOf(currentUserId);

    post.likes.splice(index, 1);
    return post.save();
  }
}

module.exports = new LikePostRepository();
