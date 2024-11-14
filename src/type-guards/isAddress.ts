import { isPhoneNumber, isString, isUrl } from "inferred-types";
import { Url } from "../types";

/**
 * type guard which validates that the value passed in is a URL
 */
export const isAddress = (val: unknown): val is Url => {
  return isString(val) && !isUrl(val) && !isPhoneNumber(val);
};
