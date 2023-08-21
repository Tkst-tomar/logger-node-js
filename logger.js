const { createLogger, format, transports } = require("winston");

const errorLoggerFormat = format.printf(({level, meta, timestamp})=>{
    let date = new Date(timestamp)
    return `ERROR ON : ${date.toString()} LEVEL : ${level} INFO : ${meta.message}`
})

const logger = createLogger({
  transports: [
    new transports.File({
      level: "info",
      filename: "./logs/allInfoLogs/allInfoLogs.log",
    }),
    new transports.File({
        level: "warn",
        filename: "./logs/allInfoLogs/allInfoLogs.log",
      }),
      new transports.File({
        level: "error",
        filename: "./logs/allInfoLogs/allInfoLogs.log",
      }),
  ],
  format: format.combine(
    format.json(),
    format.timestamp(),
    format.prettyPrint()
  ),
});

const apiLogger = createLogger({
    transports: [
      new transports.File({
        level: "warn",
        filename: "./logs/apilogs/warningLogs.log",
      }),
      new transports.File({
        level: "error",
        filename: "./logs/apilogs/errorLogs.log",
      }),
      new transports.File({
        level: "info",
        filename: "./logs/apilogs/infoLogs.log",
      }),
    ],
    format: format.combine(
      format.json(),
      format.timestamp(),
      format.prettyPrint()
    ),
  });

const errorLogger = createLogger({
  transports: [
    new transports.File({
      filename: "./logs/errorLogs/applcationErrors.log",
    }),
  ],
  format: format.combine(format.json(), format.timestamp(), errorLoggerFormat),
});

module.exports = {logger, errorLogger, apiLogger};