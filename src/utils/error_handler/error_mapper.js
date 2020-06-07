const { ValidationError } = require('@hapi/joi');
const FormError = require('./form_error');

const ErrorMapper = (joiError) => {
  let errorList = [];
  if (joiError instanceof ValidationError) {
    const errors = joiError.details;
    if (errors.length > 0) {
      errorList = errors.map((error) => FormError(error.context.key, error.message));
    }
  }

  return errorList;
};

module.exports = ErrorMapper;
