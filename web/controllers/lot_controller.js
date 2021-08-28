const Trades = require("../../logic/trades");

const index = async (req, res, next) => {
  try {
    const lots = await Trades.get_list_lots(req.body);

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

module.exports = { index, create, update };
