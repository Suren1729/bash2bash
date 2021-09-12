const Trades = require("../../logic/trades");

const index = async (req, res, next) => {
  try {
    const { user_id } = req.query;

    if (user_id) {
      const lots = await Trades.get_list_lots(+user_id);

      return res.status(200).json(lots);
    }

    const lots = await Trades.get_list_lots();

    return res.status(200).json(lots);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const lot = await Trades.create_lot(req.body);

    return res.status(201).json(lot);
  } catch (err) {
    next(err);
  }
};
const update = async (req, res, next) => {
  try {
    const lot = await Trades.update_lot(req.params.id, req.body);

    return res.status(200).json(lot);
  } catch (err) {
    next(err);
  }
};

const get_comments = async (req, res, next) => {
  try {
    const lot_comments = await Trades.get_list_lot_comments(+req.params.id);

    return res.json(lot_comments);
  } catch (err) {
    next(err);
  }
};

const create_comment = async (req, res, next) => {
  try {
    const comment = await Trades.create_lot_comment(req.body);

    return res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

module.exports = { index, create, update, get_comments, create_comment };
