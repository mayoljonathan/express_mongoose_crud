const mongoose = require('mongoose');
const BaseRepository = require('./base');
const { Post } = require('../models');

const AUTHOR_PUBLIC_PROPS = '_id displayName';

class PostRepository extends BaseRepository {
  constructor(model) {
    super();
    this.model = model;
  }

  async find(query = {}, { multiple = true } = {}) {
    // If not a valid id, then return null, because there will be no documents saved in db since it isn't a ObjectId from mongoose
    if (query._id && !mongoose.Types.ObjectId.isValid(query._id)) return null;

    // TODO: dont include comments that has deletedAt
    const filter = {
      ...query,
      deletedAt: null,
    };

    const results = multiple ? this.model.find(filter) : this.model.findOne(filter);
    return results
      .select('-__v')
      .populate('author', AUTHOR_PUBLIC_PROPS)
      .populate('likes', AUTHOR_PUBLIC_PROPS)
      .populate('comments.author', AUTHOR_PUBLIC_PROPS)
      .populate('comments.likes', AUTHOR_PUBLIC_PROPS)
      .exec();
  }

  update({ post, updatePostDTO }) {
    const { body } = updatePostDTO;
    return post.updateOne({ body });
  }

  delete(post) {
    // Soft delete the post
    return post.updateOne({ deletedAt: Date.now() });
  }
}

module.exports = new PostRepository(Post);
