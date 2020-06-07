const CustomError = require('./custom_error');

class NotFoundError extends CustomError {
  constructor(message = 'Resource cannot be found') {
    super(message);
    this.message = message;
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
