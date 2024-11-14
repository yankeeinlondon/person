import { isString } from "inferred-types";
import { Url } from "../types";

/**
 * type guard which validates that the value passed in is a URL
 */
export const isUrl = (val: unknown): val is Url => {
  return isString(val) && val.startsWith("https://");
};
