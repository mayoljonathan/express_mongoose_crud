const Joi = require('@hapi/joi');

class CreatePostDTO {
  constructor({ body, author }) {
    this.body = body;
    this.author = author;
  }

  validate() {
    const schema = Joi.object({
      body: Joi.string().required(),
      author: Joi.required(),
    });

    return schema.validate(
      {
        body: this.body,
        author: this.author,
      },
      {
        abortEarly: false,
      }
    );
  }
}

module.exports = CreatePostDTO;
