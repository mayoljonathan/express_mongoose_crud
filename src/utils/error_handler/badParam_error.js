const CustomError = require('./custom_error');

class BadParamError extends CustomError {
  constructor(message = 'Bad parameter') {
    super(message);
    this.message = message;
    this.name = 'BadParamError';
  }
}

module.exports = BadParamError;
