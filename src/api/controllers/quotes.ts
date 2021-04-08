import models from "@models/index";
import { asyncHandler } from "@utils/errors";
import logger from "@utils/logger";
import { formatResponse } from "@utils/response";
import { RandomQuotesStruct } from "@utils/validation";
import { Router } from "express";
import { create } from "superstruct";

const quotesRouter = Router();

const randomShuffle = (dataList: Array<unknown>): Array<unknown> => {
  let currentIdx = dataList.length;

  while (currentIdx !== 0) {
    const randomIdx = Math.floor(Math.random() * currentIdx);
    currentIdx -= 1;

    const temp = dataList[currentIdx];
    dataList[currentIdx] = dataList[randomIdx];
    dataList[randomIdx] = temp;
  }

  return dataList;
};

quotesRouter.get(
  "/random",
  asyncHandler(async (req, res) => {
    const data = create(req.query, RandomQuotesStruct);
    const quotesQuery = models.Quotes.find();

    if (data.minLength) {
      quotesQuery.where({
        length: { $gte: data.minLength }
      });
    }

    if (data.maxLength) {
      quotesQuery.where({
        length: { $lte: data.maxLength }
      });
    }

    if (data.tags) {
      const tagsList = data.tags.split(",");
      quotesQuery.where({
        tags: { $all: tagsList }
      });
    }

    const quotesList = await quotesQuery.exec();

    const shuffledQuotes = randomShuffle(quotesList);

    const quotes = shuffledQuotes.slice(0, data.limit);
    logger.info(`Quotes Query Filter: ${JSON.stringify(data)}`);

    const result = {
      count: quotes.length,
      quotes
    };

    return formatResponse({ res, result });
  })
);

export default quotesRouter;
