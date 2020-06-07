const CustomError = require('./custom_error');

class ValidationError extends CustomError {
  constructor(message, errors) {
    super(message);
    this.message = message;
    this.errors = errors;
    this.name = 'ValidationError';
  }
}

module.exports = ValidationError;
