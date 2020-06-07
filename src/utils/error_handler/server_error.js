const CustomError = require('./custom_error');

class ServerError extends CustomError {
  constructor(message = 'An error has occured') {
    super(message);
    this.message = message;
    this.name = 'ServerError';
  }
}

module.exports = ServerError;
