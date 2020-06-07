const mongoose = require('mongoose');

module.exports = async () => {
  const connection = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  return connection;
};
