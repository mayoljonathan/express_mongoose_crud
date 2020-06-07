class CustomError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      errors: this.errors,
    };
  }
}

module.exports = CustomError;
