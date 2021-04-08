import appRoot from "app-root-path";

process.env.NODE_ENV = "development" || process.env.NODE_ENV;

export default {
  isDev: process.env.NODE_ENV === "development",
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  db: {
    url: process.env.DB_URL
  },
  moesIf: {
    id: process.env.MOESIF_ID
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    level: "info"
  },
  winston: {
    file: {
      level: "info",
      filename: `${appRoot}/logs/api.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
      timestamp: true
    },
    console: {
      level: "debug",
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp: true
    }
  }
};
