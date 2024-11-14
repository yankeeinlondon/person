import { Address } from "cluster";
import { Email, PhoneNumber } from "../types";

export const fetch = <T extends Email | Address | PhoneNumber | Name | Address>(
  find: T,
) => {};
