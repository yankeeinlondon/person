import {  isString } from "inferred-types";
import { Url } from "../types";
import { isUrl } from "./isUrl";
import { isPhoneNumber } from "inferred-types";}

/**
 * type guard which validates that the value passed in is a URL
 */
export const isName = (val: unknown): val is Url => {
  return isString(val) &&
    !isUrl(val) &&
    !isPhoneNumber(val) &&
    [2,3].includes(val.trim().split(/\s+/).length);
};
