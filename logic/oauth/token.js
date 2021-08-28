const jwt = require("jsonwebtoken");

const ApiError = require("../../web/exceptions/api_error");
const {Token} = require("../../models");

const JWT_ACCESS_TOKEN_SECRET = "JWT_ACCESS_TOKEN_SECRET";
const JWT_REFRESH_TOKEN_SECRET = "JWT_REFRESH_TOKEN_SECRET";

const generate = payload => {
  const access_token = jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });
  const refresh_token = jwt.sign(payload, JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "10m",
  });

  return {access_token, refresh_token};
};

const save = async (user_id, refresh_token) => {
  const token_data = await Token.findOne({where: {user_id}});
  if (token_data) {
    token_data.refresh_token = refresh_token;
    return await token_data.save();
  }

  return await Token.create({user_id, refresh_token});
};


const remove = async refresh_token => {
  if (!refresh_token) throw ApiError.Unauthorized();

  const token = await Token.findOne({where: {refresh_token}});
  if (!token) throw ApiError.Unauthorized();

  await token.destroy();
  return;
};

const refresh = async refresh_token => {
  if (!refresh_token) throw ApiError.Unauthorized();

  const user = validate(refresh_token, "refresh");
  if (!user) throw ApiError.Unauthorized();

  const db_refresh_token = await Token.findOne({where: {refresh_token}});
  if (!db_refresh_token) throw ApiError.Unauthorized();

  return user.id;
};

const validate = (token, type) => {
  try {
    if (type === "access") {
      return jwt.verify(token, JWT_ACCESS_TOKEN_SECRET);
    } else if (type === "refresh") {
      return jwt.verify(token, JWT_REFRESH_TOKEN_SECRET);
    }
  } catch (err) {
    return null;
  }
};

module.exports = {generate, save, remove, refresh, validate};
