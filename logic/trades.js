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
  lot.is_accepted = true;
  await lot.save();
  return lot;
};

const exchange = async (lot_id, offer_id, is_accepted) => {
  const lot = await get_lot(lot_id);
  const offer = await get_offer(offer_id);

  if (is_accepted === true) {
    const offers = await Offer.findAll({
      include: { association: "lot", where: { id: lot_id } },
    });

    console.log(offers);
    return "";
    // return await update_lot_and_offer_statuses(lot, offer, {
    //   is_accepted: true,
    //   status: "success",
    // });
  }

  return await update_lot_and_offer_statuses(lot, offer, {
    is_accepted: false,
    status: "reject",
  });
};

const get_list_offers = async () => {
  return await Offer.findAll();
};

const get_offer = async (id) => {
  return await Offer.findByPk(id);
};

const create_offer = async (attrs) => {
  const offer = await Offer.create(attrs).then((data) => ({
    ...new OfferDto(data),
  }));
  return offer;
};

const update_lot_and_offer_statuses = async (
  lot,
  offer,
  { is_accepted, status }
) => {
  [lot.is_accepted, offer.status] = [is_accepted, status];
  await lot.save();
  const offer_title = await offer.save().then((d) => d.dataValues.title);

  return is_accepted === true
    ? { message: `The exchange with ${offer_title} was done` }
    : { message: `The exchange with ${offer_title} wasn't done` };
};

module.exports = {
  get_list_lots,
  get_lot,
  get_lot_by,
  create_lot,
  create_offer,
  get_list_offers,
  get_offer,
  update_lot,
  exchange,
};
