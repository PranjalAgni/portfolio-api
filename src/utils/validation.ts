import {
  coerce,
  defaulted,
  number,
  object,
  optional,
  string
} from "superstruct";

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
