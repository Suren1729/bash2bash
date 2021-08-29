const ApiError = require("../exceptions/api_error");
const Oauth = require("../../logic/oauth");

const oauth2 = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return next(ApiError.Unauthorized());

  const access_token = authorization.split(" ")[1];
  if (!access_token) return next(ApiError.Unauthorized());

  // const user = await Oauth.validate_token(access_token, "access");
  // if (!user) return next(ApiError.Unauthorized());

  // req.user = user;

  next();
};

module.exports = { oauth2 };
