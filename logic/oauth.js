const jwt = require("jsonwebtoken");

const Token = require("./oauth/token");

const create_token = async (attrs) => {
  const tokens = Token.generate(attrs);
  await Token.save(attrs.id, tokens.refresh_token);
  return tokens;
};

const remove_refresh_token = async (refresh_token) => {
  return await Token.remove(refresh_token);
};

const refresh_token = async (refresh_token) => {
  return await Token.refresh(refresh_token);
};

const validate_token = (token, type) => Token.validate(token, type);

module.exports = {
  create_token,
  remove_refresh_token,
  refresh_token,
  validate_token,
};
