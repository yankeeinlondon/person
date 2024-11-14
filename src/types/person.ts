import { NameAspect } from "./name-types";

export type PrimaryIdentifier = "name" | "address" | "phone-number";

export type Identifier =
  | PrimaryIdentifier
  | "country"
  | "state"
  | "region"
  | "postcode"
  | "zipcode";

export type PersonIdentifier = {
  primary: PrimaryIdentifier;
  secondaryFilters: Identifier[];
};

/**
 * The finalized representation of a person
 * after running through the deduplication
 * process.
 */
export type Person = {
  id: string;
  /**
   * The various structural components of the person's name.
   *
   * **Note:** unlike the name's coming directly from "source"
   * this field will have gone through the `nameParser` so
   * it is unlikely to contain the "raw" type and instead have
   * the various structural aspects (e.g., firstName, lastName, etc.)
   */
  name: NameAspect[];
  inputs: any;
  filters: any;

  emailAddresses?: SourcedEmail[];
};
