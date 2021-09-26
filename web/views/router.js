const router = require("express").Router();

{
  const {
    index,
    // create,
    // get_all_lots,
    // get_all_offers,
  } = require("./controllers/lot_controller");

  router.get("/lots", index);
}

module.exports = router;
