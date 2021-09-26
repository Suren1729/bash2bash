const fetch = require("node-fetch");

const index = async (req, res) => {
  const list_lots = await fetch("http://localhost:4000/api/v1/lots").then(res =>
    res.json(),
  );

  return res.render("lots", {lots: list_lots});
};

module.exports = {index};
