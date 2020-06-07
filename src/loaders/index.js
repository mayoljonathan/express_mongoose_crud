const mongooseLoader = require('./mongoose');
const expressLoader = require('./express');

module.exports.init = async (expressApp) => {
  await mongooseLoader();
  console.log('Connected to database!');

  await expressLoader(expressApp);
  console.log('Express initialized!');
};
