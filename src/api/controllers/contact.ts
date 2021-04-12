import models from "@models/index";
import { asyncHandler } from "@utils/errors";
import logger from "@utils/logger";
import { formatResponse } from "@utils/response";
import { SubmitContactStruct } from "@utils/validation";
import { Router } from "express";
import createError from "http-errors";
import { validate } from "superstruct";
const contactRouter = Router();

contactRouter.post(
  "/submit",
  asyncHandler(async (req, res, next) => {
    logger.info("Inside contact submit handler");
    const [err, data] = validate(req.body, SubmitContactStruct);

    if (err) {
      logger.error(`Invalid request body sent ${err}`);
      res.status(400);
      return next(createError(400, err));
    }

    try {
      await models.Contact.create(data);
    } catch (ex) {
      logger.error(
        `Error occured while submitting contact ${JSON.stringify(ex)}`
      );
    }
    return formatResponse({ res, result: { success: true } });
  })
);

export default contactRouter;
