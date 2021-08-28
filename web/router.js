const router = require("express").Router();

{
  const { oauth2 } = require("./middlewares/oauth2");
  const { index, create } = require("./controllers/user_controller");

  router.get("/users", oauth2, index);
  router.post("/users", create);
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
  router.patch("/lots/:id", update);
}

{
  const { index, create } = require("./controllers/offer_controller");

  router.get("/offers", index);
  router.post("/offers", create);
}

module.exports = router;
