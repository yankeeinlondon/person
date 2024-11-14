import { UrlPath } from "./url";

/**
 * the various parts of a name field; mainly will use "raw"
 * when taking from a source unless the source has useful
 * structure to the name field it has already parsed out.
 */
export type NameAspectType =
  | "raw"
  | "firstName"
  | "lastName"
  | "middleName"
  | "prefix"
  | "postfix";

export type NameAspect = {
  type: NameAspectType;
};

/**
 * raw name data from a source, along with the source it was taken from
 */
export type NameRecord = {
  source: UrlPath;
  nameAspects: NameAspect[];
};
