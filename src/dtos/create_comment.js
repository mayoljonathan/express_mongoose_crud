const Joi = require('@hapi/joi');

class CreateCommentDTO {
  constructor({ postId, body, author }) {
    this.postId = postId;
    this.body = body;
    this.author = author;
  }

  validate() {
    const schema = Joi.object({
      postId: Joi.required(),
      body: Joi.string().required(),
      author: Joi.required(),
    });

    return schema.validate(
      {
        postId: this.postId,
        body: this.body,
        author: this.author,
      },
      {
        abortEarly: false,
      }
    );
  }
}

module.exports = CreateCommentDTO;
