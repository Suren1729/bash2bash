const router = require("express").Router();

{
  const { oauth2 } = require("./middlewares/oauth2");
  const {
    index,
    create,
    get_all_lots,
    get_all_offers,
  } = require("./controllers/user_controller");

  router.get("/users", oauth2, index);
  router.post("/users", create);
  router.get("/users/:id/lots", get_all_lots);
  router.get("/users/:id/offers", get_all_offers);
}

{
  const {
    refresh,
    create,
    remove,
  } = require("./controllers/session_controller");

  router.get("/sessions", refresh);
  router.post("/sessions", create);
  router.delete("/sessions", remove);
}

{
  const { index, create, update } = require("./controllers/lot_controller");

  router.get("/lots", index);
  router.post("/lots", create);
}

{
  const { index, create } = require("./controllers/offer_controller");

  router.get("/offers", index);
  router.post("/offers", create);
}

{
  const { update } = require("./controllers/exchange_controller");

  router.patch("/lots/:lot_id/offers/:offer_id", update);
}

module.exports = router;
