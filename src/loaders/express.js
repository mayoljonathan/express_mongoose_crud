const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = swaggerJsDoc(require('../config/swaggerOptions.json'));
const { passport } = require('../config/passport');

const api = require('../routes');

module.exports = (expressApp) => {
  expressApp.use(bodyParser.json({ extended: true }));
  expressApp.use(bodyParser.urlencoded({ extended: true }));

  expressApp.use(passport.initialize());

  expressApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  expressApp.use('/api/', api);

  return expressApp;
};
