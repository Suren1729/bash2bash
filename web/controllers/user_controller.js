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

const get_all_lots = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const list_lots = await Accounts.get_all_lots(user_id);

    return res.json(list_lots);
  } catch (err) {
    next(err);
  }
};

module.exports = { index, create, get_all_lots };
