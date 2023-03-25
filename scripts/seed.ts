// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv-safe").config({
  allowEmptyValues: true
});

import "module-alias/register";
import mongoose from "mongoose";
import models from "../src/models";
import connectDB from "../src/db";
import quotes from "../data/quotes.json";
import logger from "../src/utils/logger";

const startSeeding = async () => {
  try {
    await connectDB();
    logger.info("Seeding started");
    const trimmedQuotes = quotes.map(
      ({ content, author, authorSlug, tags, length }) => ({
        content,
        author,
        authorSlug,
        tags,
        length
      })
    );

    await models.Quotes.insertMany(trimmedQuotes);
    logger.info("Seeding Completed");
    process.exit();
  } catch (ex) {
    logger.error(ex);
  }
};

startSeeding();
