import winston from "winston";

const { combine, timestamp, json } = winston.format;
const levelFilter = (level) => {
  return winston.format((info) => info.level === level ? info : false)();
};

export const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    new winston.transports.Console(),

    //Error logging
    new winston.transports.File({
      filename: "logs/error.log",
      level: 'error',
      format: combine(
        levelFilter('error'),
        timestamp(),
        json()
      )
    }),

    //info only
    new winston.transports.File({
      filename: "logs/info.log",
      level: 'info',
      format: combine(
        levelFilter('info'),
        timestamp(),
        json()
      )
    })
  ]
})