const { CreatePostDTO, UpdatePostDTO } = require('../dtos');
const { PostService } = require('../services');
const { ValidationError } = require('../utils/error_handler');
const { ResponseHandler } = require('../utils/response_hander');

class PostController {
  static async findAll(req, res) {
    try {
      const posts = await PostService.findAll();
      res.send(ResponseHandler.success(null, posts));
    } catch (err) {
      res.status(500).send(ResponseHandler.error(err.message, err));
    }
  }

  static async findById(req, res) {
    try {
      const post = await PostService.findById(req.params.id);
      res.send(ResponseHandler.success(null, post));
    } catch (err) {
      res.status(500).send(ResponseHandler.error(err.message, err));
    }
  }

  static async create(req, res) {
    try {
      const { body } = req.body;
      const createPostDTO = new CreatePostDTO({
        body,
        author: req.user._id,
      });

      const result = await PostService.create(createPostDTO);

      res.send(ResponseHandler.success('Posted successfully!', result));
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).send(ResponseHandler.fail(null, err));
      }
      res.status(500).send(ResponseHandler.error(err.message, err));
    }
  }

  static async update(req, res) {
    try {
      const { body } = req.body;
      const updatePostDTO = new UpdatePostDTO({ id: req.params.id, body });

      await PostService.update({ updatePostDTO, currentUserId: req.user._id });

      res.send(ResponseHandler.success('Your post has been updated!'));
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).send(ResponseHandler.fail(null, err));
      }
      res.status(500).send(ResponseHandler.error(err.message, err));
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await PostService.delete({ id, currentUserId: req.user._id });

      res.send(ResponseHandler.success('Your post has been deleted!'));
    } catch (err) {
      res.status(500).send(ResponseHandler.error(err.message, err));
    }
  }
}

module.exports = PostController;
