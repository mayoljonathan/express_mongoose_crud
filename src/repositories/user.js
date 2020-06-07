const BaseRepository = require('./base');
const { User } = require('../models');

class UserRepository extends BaseRepository {
  constructor(model) {
    super();
    this.model = model;
  }

  // override BaseRepository create function
  async create(registerUserDTO) {
    const user = await this.model(registerUserDTO).save();

    const plainUser = user.hideSensitiveInfo();
    return plainUser;
  }
}

module.exports = new UserRepository(User);
