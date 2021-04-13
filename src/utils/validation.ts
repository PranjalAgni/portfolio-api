import isEmail from "is-email";
import {
  coerce,
  defaulted,
  define,
  number,
  object,
  optional,
  size,
  string
} from "superstruct";
import logger from "./logger";

const email = () =>
  define("email", (value) => {
    logger.info(value);
    return isEmail(value);
  });

export const RandomQuotesStruct = object({
  maxLength: optional(coerce(number(), string(), (value) => +value)),
  minLength: optional(coerce(number(), string(), (value) => +value)),
  tags: optional(string()),
  limit: optional(
    defaulted(
      coerce(number(), string(), (value) => +value),
      5
    )
  ),
  skip: optional(
    defaulted(
      coerce(number(), string(), (value) => +value),
      0
    )
  )
});

export const SubmitContactStruct = object({
  email: email(),
  name: size(string(), 3, 20),
  message: size(string(), 5, 300)
});
