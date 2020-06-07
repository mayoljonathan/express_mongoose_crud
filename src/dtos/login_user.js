const Joi = require('@hapi/joi');

class LoginUserDTO {
  constructor({ username, password }) {
    this.username = username;
    this.password = password;
  }

  validate() {
    const schema = Joi.object({
      username: Joi.string().min(6).required(),
      password: Joi.string().min(8).required(),
    });

    return schema.validate(
      {
        username: this.username,
        password: this.password,
      },
      {
        abortEarly: false,
      }
    );
  }
}

module.exports = LoginUserDTO;
