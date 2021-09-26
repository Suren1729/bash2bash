const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const log4js = require("./logger");
const exphbs = require("express-handlebars");
const fetch = require("node-fetch");

const logger = log4js.getLogger("EXPRESS");
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
  }),
);
app.use(express.static(path.join(__dirname, "views/assets")));
app.set("view engine", "hbs");

app.use("/api/v1", require("./web/router"));
app.use("/", require("./web/views/router"));
app.use(require("./web/middlewares/error_middleware"));
app.use(
  log4js.connectLogger(logger, {
    format: (req, _, format) =>
      format(`:method :status :url ${JSON.stringify(req.body, 0, 2)}`),
    statusRules: [
      {from: 100, to: 199, level: "info"},
      {from: 200, to: 299, level: "debug"},
      {from: 300, to: 399, level: "info"},
      {from: 400, to: 499, level: "warn"},
      {from: 500, to: 599, level: "error"},
    ],
  }),
);

app.listen(PORT, () => console.log(`App listening at the ${PORT} port`));
