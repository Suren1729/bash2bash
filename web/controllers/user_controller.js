const Accounts = require("../../logic/accounts");

const ONE_HOUR = 3600 * 1000;

const index = (req, res, next) => {
  return;
};

const create = async (req, res, next) => {
  try {
    const user = await Accounts.create_user(req.body);

    res.cookie("refresh_token", user.refresh_token, {
      maxAge: ONE_HOUR,
      httpOnly: true,
    });
    return res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { index, create };
