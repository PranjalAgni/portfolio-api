import { asyncHandler } from "@utils/errors";
import logger from "@utils/logger";
import { SubmitContactStruct } from "@utils/validation";
import { Router } from "express";
import { assert, validate } from "superstruct";
import createError from "http-errors";
const contactRouter = Router();

contactRouter.post(
  "/submit",
  asyncHandler(async (req, res, next) => {
    const [err, data] = validate(req.body, SubmitContactStruct);

    if (err) {
      res.status(400);
      return next(createError(400, err));
    }

    return res.json({
      ...data
    });
  })
);

export default contactRouter;
