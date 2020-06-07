const mongoose = require('mongoose');

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(document) {
    return this.model(document).save();
  }

  async find(query = {}, { multiple = true } = {}) {
    // If not a valid id, then return null, because there will be no documents saved in db since it isn't a ObjectId from mongoose
    if (query._id && !mongoose.Types.ObjectId.isValid(query._id)) return null;

    const results = multiple ? this.model.find(query) : this.model.findOne(query);
    return results.exec();
  }
}

module.exports = BaseRepository;
