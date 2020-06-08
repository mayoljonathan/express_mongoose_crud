const { LikePostRepository } = require('../repositories');
const PostService = require('./post');
const { BadParamError } = require('../utils/error_handler');

class LikePostService {
  static async create({ postId, currentUserId }) {
    if (!postId) throw new BadParamError();

    const post = await PostService.findById(postId);
    const didLike = await LikePostRepository.findOne({ post, currentUserId });
    if (didLike) return false;

    await LikePostRepository.create({ post, currentUserId });
    return true;
  }

  static async delete({ postId, currentUserId }) {
    if (!postId) throw new BadParamError();

    const post = await PostService.findById(postId);
    const didLike = await LikePostRepository.findOne({ post, currentUserId });
    if (!didLike) return false;

    await LikePostRepository.delete({ post, currentUserId });
    return true;
  }
}

module.exports = LikePostService;
