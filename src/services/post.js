const { PostRepository } = require('../repositories');
const { ValidationError, NotFoundError, ErrorMapper } = require('../utils/error_handler');

class PostService {
  static async findById(id) {
    const post = await PostRepository.find({ _id: id }, { multiple: false });
    if (!post) throw new NotFoundError('Post does not exist.');
    if (post.deletedAt) throw new NotFoundError('Post cannot be found. It may have been deleted.');

    return post;
  }

  static async findAll() {
    return PostRepository.find();
  }

  static async create(createPostDTO) {
    const { error } = createPostDTO.validate();
    if (error) throw new ValidationError(null, ErrorMapper(error));

    await PostRepository.create(createPostDTO);
  }

  static async update({ updatePostDTO, currentUserId }) {
    const { id } = updatePostDTO;
    const { error } = updatePostDTO.validate();
    if (error) throw new ValidationError(null, ErrorMapper(error));

    const post = await this.findById(id);
    if (!post.author._id.equals(currentUserId)) throw new Error("You can't update others post.");

    await PostRepository.update({ post, updatePostDTO });
  }

  static async delete({ id, currentUserId }) {
    const post = await this.findById(id);
    if (!post.author._id.equals(currentUserId)) throw new Error("You can't delete others post.");

    await PostRepository.delete(post);
  }
}

module.exports = PostService;
