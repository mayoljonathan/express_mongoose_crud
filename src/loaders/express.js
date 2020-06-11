const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = swaggerJsDoc(require('../config/swaggerOptions.json'));
const { passport } = require('../config/passport');

const api = require('../routes');
const { ResponseHandler } = require('../utils/response_hander');

module.exports = (expressApp) => {
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: true }));

  expressApp.use(passport.initialize());

  expressApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  expressApp.use('/api/', api);

  expressApp.use((req, res) => {
    res.send(ResponseHandler.error('Invalid request. Please check the docs for information.'));
  });

  return expressApp;
};
