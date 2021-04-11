import models from "@models/index";
import { asyncHandler } from "@utils/errors";
import { formatResponse } from "@utils/response";
import { SubmitContactStruct } from "@utils/validation";
import { Router } from "express";
import createError from "http-errors";
import { validate } from "superstruct";
const contactRouter = Router();

contactRouter.post(
  "/submit",
  asyncHandler(async (req, res, next) => {
    const [err, data] = validate(req.body, SubmitContactStruct);

    if (err) {
      res.status(400);
      return next(createError(400, err));
    }

    await models.Contact.create(data);
    return formatResponse({ res, result: { success: true } });
  })
);

export default contactRouter;
