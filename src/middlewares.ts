import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import createError from "http-errors";
import moesif from "moesif-nodejs";
import config from "./config";
import requestIp from "request-ip";

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
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): Response => {
  const statusCode = res.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(statusCode);
  return res.json({
    status: statusCode,
    result: null,
    error: error.stack
  });
};

export const moesifMiddleware = moesif({
  applicationId: config.moesIf.id,
  logBody: true,
  identifyUser: (req: Request) => {
    return requestIp.getClientIp(req);
  }
});