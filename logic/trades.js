const { Lot, Offer } = require("../models");
const LotDto = require("./dtos/lot");
const OfferDto = require("./dtos/offer");

const get_list_lots = async () => {
  return await Lot.findAll();
};

const get_lot = async (id) => {
  return await Lot.findByPk(id);
};

const get_lot_by = async (attrs) => {
  return await User.findOne({ where: { username: attrs.username } }).then(
    (d) => ({
      ...new UserDto(d),
    })
  );
};

const create_lot = async (attrs) => {
  const lot = await Lot.create(attrs).then((data) => ({ ...new LotDto(data) }));
  console.log(lot);
  return lot;
};

const update_lot = async (id, attrs) => {
  const lot = await get_lot(id);
  lot.is_accespted = true;
  await lot.save();
  return lot;
};

const get_list_offers = async () => {
  return await Offer.findAll();
};

const create_offer = async (attrs) => {
  const offer = await Offer.create(attrs).then((data) => ({
    ...new OfferDto(data),
  }));
  return offer;
};

module.exports = {
  get_list_lots,
  get_lot,
  get_lot_by,
  create_lot,
  create_offer,
  get_list_offers,
  update_lot,
};
