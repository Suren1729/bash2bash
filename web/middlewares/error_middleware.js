const ApiError = require("../exceptions/api_error");
const log4js = require("../../logger");
const logger = log4js.getLogger("ERROR_MIDDLEWARE");

module.exports = (err, req, res, next) => {
  if (err instanceof ApiError) {
    logger.warn(err);
    return res
      .status(err.status)
      .json({ message: err.message, type: err.type, errors: err.errors });
  }

  if (err.status >= 400 && err.status <= 499) {
    logger.warn(err);
    return res
      .status(err.status)
      .json({ message: "Invalid request", type: "BAD_REQUEST" });
  }

  logger.error(err);
  return res.status(500).json({
    type: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong, please try again later",
  });
};
