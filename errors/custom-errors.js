class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.status = 404;
    this.msg = message;
  }
}

module.exports = { NotFoundError };
