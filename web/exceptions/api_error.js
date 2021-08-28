module.exports = class ApiError extends Error {
  status;
  type;
  errors;

  constructor(status, type, message, errors) {
    super(message);
    this.status = status;
    this.type = type;
    this.errors = errors;
  }

  static Unauthorized() {
    return new ApiError(401, "UNAUTHORIZED", "User not authorized");
  }
};
