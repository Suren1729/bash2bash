const Trade = require("../../logic/trades");

const update = async (req, res, next) => {
  try {
    const { lot_id, offer_id } = req.params;
    const { is_accepted } = req.body;

    const exchanged = await Trade.exchange(lot_id, offer_id, is_accepted);

    return res.status(200).json(exchanged);
  } catch (error) {
    next(error);
  }
};

module.exports = { update };
