const express = require('express');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = swaggerJsDoc(require('../config/swaggerOptions.json'));
const { passport } = require('../config/passport');
const { whitelistedOrigins } = require('../config/whitelisted_origins');

const api = require('../routes');
const { ResponseHandler } = require('../utils/response_hander');

module.exports = (expressApp) => {
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: true }));

  expressApp.use(passport.initialize());

  expressApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  expressApp.use('/api/', api);

  expressApp.use(
    cors({
      origin: (origin, cb) => {
        if (whitelistedOrigins.indexOf(origin) === -1) {
          const msg = 'The CORS policy for this site does not allow access from the specified origin.';
          return cb(new Error(msg), false);
        }
        return cb(null, true);
      },
    })
  );

  expressApp.use((req, res) => {
    res.send(ResponseHandler.error('Invalid request. Please check the docs for information.'));
  });

  return expressApp;
};
