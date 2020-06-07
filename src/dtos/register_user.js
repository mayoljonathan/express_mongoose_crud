const Joi = require('@hapi/joi');

class RegisterUserDTO {
  constructor({ displayName, username, password }) {
    this.displayName = displayName;
    this.username = username;
    this.password = password;
  }

  validate() {
    const schema = Joi.object({
      displayName: Joi.string().required(),
      username: Joi.string().min(6).required(),
      password: Joi.string().min(8).required(),
    });

    return schema.validate(
      {
        displayName: this.displayName,
        username: this.username,
        password: this.password,
      },
      {
        abortEarly: false,
      }
    );
  }
}

module.exports = RegisterUserDTO;
