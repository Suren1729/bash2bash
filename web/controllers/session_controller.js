const Accounts = require("../../logic/accounts");

const ONE_HOUR = 3600 * 1000;

const refresh = async (req, res, next) => {
  try {
    const user = await Accounts.refresh_session(req.cookies.refresh_token);

    res.cookie("refresh_token", user.refresh_token, {
      maxAge: ONE_HOUR,
      httpOnly: true,
    });

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const user = await Accounts.authentication(req.body);

    res.cookie("refresh_token", user.refresh_token, {
      maxAge: ONE_HOUR,
      httpOnly: true,
    });

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await Accounts.logout(req.cookies.refresh_token);
    res.clearCookie("refresh_token");

    return res.status(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {create, remove, refresh};
