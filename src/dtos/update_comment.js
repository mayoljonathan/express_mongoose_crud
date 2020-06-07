const Joi = require('@hapi/joi');

class UpdateCommentDTO {
  constructor({ postId, commentId, body, author }) {
    this.postId = postId;
    this.commentId = commentId;
    this.body = body;
    this.author = author;
  }

  validate() {
    const schema = Joi.object({
      postId: Joi.required(),
      commentId: Joi.required(),
      body: Joi.string().required(),
      author: Joi.required(),
    });

    return schema.validate(
      {
        postId: this.postId,
        commentId: this.commentId,
        body: this.body,
        author: this.author,
      },
      {
        abortEarly: false,
      }
    );
  }
}

module.exports = UpdateCommentDTO;
