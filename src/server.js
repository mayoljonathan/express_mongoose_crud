require('dotenv').config({ path: `${__dirname}/config/.env` });

const express = require('express');
const loaders = require('./loaders');

const startServer = async () => {
  const app = express();
  const port = process.env.PORT || 3000;

  try {
    await loaders.init(app);

    app.listen(port, () => console.log(`Server [${process.env.NODE_ENV}] running on port ${port}!`));
  } catch (err) {
    console.log(`Server error: ${err}`);
    process.exit(1);
  }
};

startServer();
