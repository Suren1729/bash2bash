const log4js = require("log4js");

log4js.configure({
  appenders: {
    console: {type: "stdout", layout: {type: "colored"}},
    files: {
      type: "multiFile",
      base: "./logger/logs/",
      property: "categoryName",
      extension: ".log",
      maxLogSize: 52428800,
      backups: 5,
      compress: true,
    },
  },
  categories: {
    default: {
      appenders: ["console", "files"],
      level: "trace",
    },
  },
});

module.exports = log4js;