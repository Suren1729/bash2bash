const jwt = require("jsonwebtoken");

const Token = require("./oauth/token");

const create_token = async attrs => {
  const tokens = Token.generate(attrs);
  await Token.save(attrs.id, tokens.refresh_token);
  return tokens;
}

module.exports = {
  create_token
}