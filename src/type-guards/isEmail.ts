import { isString } from "inferred-types";
import { Email } from "../types";

/**
 * type guard which validates that the value passed in is an email address.
 */
export const isEmail = (val: unknown): val is Email => {
  return isString(val) && val.includes("@") && val.includes(".");
};
