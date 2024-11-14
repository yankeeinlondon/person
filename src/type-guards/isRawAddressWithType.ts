import { isObject } from "inferred-types";
import { RawAddressWithType } from "../types";

export const isRawAddressWithType = (
  val: unknown,
): val is RawAddressWithType => {
  return isObject(val) && "address" in val && "type" in val;
};
