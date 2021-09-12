const Trades = require("../../logic/trades");

const index = async (req, res, next) => {
  try {
    const { user_id } = req.query;

    if (user_id) {
      const offers = await Trades.get_list_offers(+user_id);

      return res.status(200).json(offers);
    }

    const offers = await Trades.get_list_offers();

    return res.status(200).json(offers);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const offer = await Trades.create_offer(req.body);

    return res.status(201).json(offer);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const offer = await Trades.update_offer(req.params.id, req.body);

    return res.status(200).json(offer);
  } catch (err) {
    next(err);
  }
};

module.exports = { index, create, update };
