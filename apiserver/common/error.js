class StatusCodeError extends Error {
  constructor(code = 400, message = '', ...params) {
    super(...params);

    this.code = code;
    this.message = message;
  }
}

module.exports = {
  StatusCodeError,
}
