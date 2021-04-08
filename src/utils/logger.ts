import winston from "winston";
import Sentry from "winston-sentry-log";
import config from "@config/index";

const alignColorsAndTime = winston.format.combine(
  winston.format.colorize({
    all: true
  }),
  winston.format.label({
    label: "[LOGGER]"
  }),
  winston.format.timestamp({
    format: "YY-MM-DD HH:MM:SS"
  }),
  winston.format.printf(
    (info) =>
      ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
  )
);

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      ...config.winston.console,
      format: winston.format.combine(
        winston.format.colorize(),
        alignColorsAndTime
      )
    }),
    new winston.transports.File({
      ...config.winston.file,
      format: winston.format.combine(
        winston.format.colorize(),
        alignColorsAndTime
      )
    }),
    new Sentry({
      config: {
        dsn: config.sentry.dsn
      },
      level: config.sentry.level
    })
  ],
  exitOnError: false // do not exit on handled exceptions
});

export const loggerStreamWrite = (message: string): void => {
  logger.info(message);
};

export default logger;
