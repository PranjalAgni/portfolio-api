import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import createError from "http-errors";
import moesif from "moesif-nodejs";
import config from "./config";
import requestIp from "request-ip";
import logger from "@utils/logger";

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(StatusCodes.NOT_FOUND);
  return next(
    createError(StatusCodes.NOT_FOUND, `${req.originalUrl} not found`)
  );
};

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): Response => {
  let statusCode = res.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  if (statusCode === 200) statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(statusCode);
  logger.error(
    `Error occured at route ${req.url} ${JSON.stringify(error.message)}`
  );
  return res.json({
    status: statusCode,
    result: null,
    error: error
  });
};

export const moesifMiddleware = moesif({
  applicationId: config.moesIf.id,
  logBody: true,
  identifyUser: (req: Request) => {
    return requestIp.getClientIp(req);
  }
});
