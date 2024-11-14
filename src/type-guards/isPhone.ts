import { isPhoneNumber, isString, PhoneNumber } from "inferred-types";

/**
 * type guard which validates that the value passed in is a phone number
 */
export const isPhone = (val: unknown): val is PhoneNumber => {
  return isPhoneNumber(val);
};
