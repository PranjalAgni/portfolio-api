// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv-safe").config({
  allowEmptyValues: true
});

import "module-alias/register";

import models from "@models/index";
import connectDB from "../db";
import quotes from "../../data/quotes.json";
import logger from "./logger";

const startSeeding = async () => {
  try {
    await connectDB();
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
    return;
  } catch (ex) {
    logger.error(ex);
  }
};

// startSeeding();
