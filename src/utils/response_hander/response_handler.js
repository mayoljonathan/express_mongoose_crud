class ResponseHandler {
  // All went well, and (usually) some data was returned.
  static success(message, data = null) {
    // return {
    //   status: 'SUCCESS',
    //   message,
    //   data,
    // };
    return data;
  }

  // There was a problem with the data submitted, or some pre-condition of the API call wasn't satisfied
  // Mostly, these are form validation errors occured such as 'Username already exist', 'X is required.'
  static fail(message = null, error) {
    return {
      status: 'FAIL',
      message,
      error,
    };
  }

  // An error occurred in processing the request, i.e. an exception was thrown
  static error(message = null, error) {
    const showStack = process.env.NODE_ENV === 'development' && error;

    const devPayload = {
      error,
      stacktrace: error && error.stack ? error.stack : null,
    };

    return {
      status: 'ERROR',
      message,
      ...(showStack && {
        _dev: devPayload,
      }),
    };
  }
}

module.exports = ResponseHandler;
