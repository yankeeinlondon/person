import { Iso3166_1_Alpha3, Iso3166_1_CountryCode } from "inferred-types";

export type RawAddressWithType = {
  address: string;
  type: AddressType;
};

export type RawAddress = string | RawAddressWithType;

export type ParsedAddress<TCountry extends Iso3166_1_Alpha3 | ""> = {
  type: AddressType;
  line1: string;
  line2?: string;
  city?: string;
  state?: string;
  /** the 2 or 3 digit abbreviation for the country */
  countryCode: TCountry;
  /** the full country name */
  countryName?: Iso3166_1_CountryCode | "";
  street?: string;
  postCode?: string;
  district?: string;
  apartment?: string;
  location?: {
    longitude: number;
    latitude: number;
  };
  formatted?: string;
};

export type AddressType = "current" | "prior" | "alternative" | "unknown";

export type AddressRecord = {
  /** the "type" of address it is if available from API */
  type: AddressType;
  /** raw address information */
  address: RawAddress;
  location?: {
    longitude: number;
    latitude: number;
  };
};
