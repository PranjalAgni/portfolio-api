import { Response } from "express";

type IFormatResponse = {
  res: Response;
  result?: unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: Error | Record<string, any>;
};
export const formatResponse = ({
  res,
  result,
  error
}: IFormatResponse): Response<string, Record<string, string>> => {
  return res.json({
    status: res.statusCode,
    result,
    error
  });
};
