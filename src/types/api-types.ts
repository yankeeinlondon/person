import { AddressRecord } from "./address-types";
import { EmailRecord } from "./email-types";
import { PhoneRecord } from "./phone-types";
import { UrlPath } from "./url";

export type ApiSource = string;

/**
 * used to map the "input value" -- determined by
 * the `inputStructure` and `inputType` properties --
 * to the
 */
export type ApiInputMap<
  TKeys extends readonly string[] = []
> = {
  urlParams?: TKeys[number][],
  pathParams?: TKeys[number][],
  body?: TKeys[number][],
  header?: TKeys[number][],
}

export type InputType =
  | "name"
  | "address"
  | "email";

export type ApiMode = RestMode | "Websocket";

export type RestMode =
  | "get"
  | "post"
  | "put"
  | "head"
  | "patch"
  | "delete";

export type WsToken = `ws::${string}`

export type RequestStructure =
| "json"
| "text"
| "yaml"
| "csv"
| "formFields"
| "urlParams";

export type SourceResponseName = {
  emails: EmailRecord[];
  phoneNumbers: PhoneRecord[];
  addresses: AddressRecord[];
}

export type SecondaryFilter = {
  name?: string[];
  address?: string[];
  phone?: string[];
  country?: string[];
  gender?: string[];
  postCode?: string[];
}

export type SourceResponse = {
  /** the term used to identify the Person */
  searchTerm: string;
  /** the secondary filters used to reduce the results */
  secondaryFilters: SecondaryFilter[];
  /**
   * A dictionary where the keys represent variants of the name found
   * from the response. The values are all the other core data attributes.
   */
  byName: {
    [name: string]: SourceResponseName[]
  }
}



export type ApiRequest = {
  url: UrlPath;
  method: RestMode;
  payload:
}
