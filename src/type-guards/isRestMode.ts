import { isString } from "inferred-types";
import { RestMode } from "../types";

export const isRestMode = (val: unknown): val is RestMode => {
  return (
    isString(val) &&
    ["get", "post", "put", "patch", "head", "delete"].includes(val)
  );
};
