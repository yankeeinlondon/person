import { parseAddress, ParsedAddress as Parsed } from "vladdress";
import { TypedMapper } from "typed-mapper";
import { AddressType, ParsedAddress, RawAddress } from "../types";
import {
  isIso3166Alpha2,
  isIso3166Alpha3,
  Iso3166_1_Alpha3,
  Iso3166_1_CountryCode,
  isString,
  lookupCountryAlpha3,
  lookupCountryName,
  Never,
} from "inferred-types";
import { isRawAddressWithType } from "../type-utils/isRawAddressWithType";
import { tokenize } from "../utils/tokenize";

export const getCountryCode = <T extends string>(
  address: T,
): Iso3166_1_Alpha3 | "" => {
  const tokens = tokenize(address);
  const found = tokens.find((i) => isIso3166Alpha2(i) || isIso3166Alpha3(i));

  return found ? lookupCountryAlpha3(found) : undefined;
};

export const getCountryName = (address: string): Iso3166_1_CountryCode | "" => {
  const tokens = tokenize(address);
  const found = tokens.find((i) => isIso3166Alpha2(i) || isIso3166Alpha3(i));
  return found ? lookupCountryName(found) : "";
};

const parser = (
  address: string,
  type: AddressType = "unknown" as AddressType,
) => {
  const parsed = {};

  const mapper = TypedMapper.map<Partial<Parsed>, ParsedAddress<any>>({
    line1: (i) => i?.addressLine1 || "",
    line2: (i) => i?.addressLine2,
    type: () => type,
    city: (i) => i?.placeName,
    district: (i) => i?.placeName,
    state: (i) => i?.stateName,
    formatted: (i) => i?.formattedAddress,
    street: (i) => i?.streetName,
    // apartment: (i) => getApartment(address),
    countryCode: () => getCountryCode(address),
    countryName: () => getCountryName(address),
    postCode: (i) => i?.zipCodePlusFour || i?.zipCode,
  });

  return mapper.convertObject(parsed);
};

export const addressParser = <T extends RawAddress>(address: T) => {
  return isString(address)
    ? parser(address)
    : isRawAddressWithType(address)
      ? parser(address.address, address.type)
      : Never;
};
