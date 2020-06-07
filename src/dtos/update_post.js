const Joi = require('@hapi/joi');

class UpdatePostDTO {
  constructor({ id, body }) {
    this.id = id;
    this.body = body;
  }

  validate() {
    const schema = Joi.object({
      id: Joi.required(),
      body: Joi.string().required(),
    });

    return schema.validate(
      {
        id: this.id,
        body: this.body,
      },
      {
        abortEarly: false,
      }
    );
  }
}

module.exports = UpdatePostDTO;
