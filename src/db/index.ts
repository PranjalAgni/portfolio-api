import mongoose from "mongoose";
import logger from "@utils/logger";
import config from "@config/index";

const connectDB = async (): Promise<void> => {
  logger.info("Connecting app to mongoDB");
  await mongoose.connect(config.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
};

mongoose.connection.on("error", (err) => {
  logger.error(err.stack);
});

mongoose.connection.on("disconnected", () => {
  logger.info("Lost connection from database");
  logger.info("Retrying...");
  connectDB();
});

mongoose.connection.on("connected", () => {
  logger.info("Connected to DB");
});

mongoose.connection.on("reconnected", () => {
  logger.info("Reconnected to DB");
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    logger.info("Force closing MongoDB connection");
    process.exit(0);
  });
});

export default connectDB;
