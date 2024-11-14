import {
  IsEqual,
  Narrowable,
  DefineObject,
  DefineObjectApi,
  FromDefn,
} from "inferred-types";
import { ApiMode, RequestStructure, RestMode } from "./api-types";
import { UrlPath } from "./url";

/**
 * A partially implemented definition of an API endpoint.
 */
export type EndpointDefn<
  TName extends string,
  TMode extends ApiMode,
  TUrl extends UrlPath | undefined,
  TReq,
  TResp,
> = {
  name: TName;
  mode: TMode;
  url: TUrl;
  req: TReq;
  resp: TResp;
};

export type HideDefined<T> = {
  [K in keyof T]: K extends "state"
    ? T[K]
    : IsEqual<T[K], undefined> extends true
      ? T[K]
      : never;
};

export type EndpointBuilderApi<
  TName extends string,
  TMode extends ApiMode,
  TUrl extends UrlPath | undefined,
  TReq = Narrowable | undefined,
  TResp = Narrowable | undefined,
> = {
  state: Readonly<EndpointDefn<TName, TMode, TUrl, TReq, TResp>>;

  /** Define the URL path to the API endpoint */
  url: <T extends UrlPath>(
    val: T,
  ) => EndpointBuilderApi<TName, TMode, T, TReq, TResp>;

  requestType: <T extends Narrowable | undefined>(
    val: T,
  ) => EndpointBuilderApi<TName, TMode, TUrl, T, TResp>;

  responseType: <T extends Narrowable | undefined>(
    val: T,
  ) => EndpointBuilderApi<TName, TMode, TUrl, TReq, T>;
};

export type CreateEndpointBuilder<
  TName extends string,
  TMode extends ApiMode,
> = <
  TUrl extends UrlPath | undefined = UrlPath | undefined,
  TReq = unknown | undefined,
  TResp = unknown | undefined,
>(
  state: EndpointDefn<TName, TMode, TUrl, TReq, TResp>,
) => EndpointBuilderApi<TName, TMode, TUrl, TReq, TResp>;

export type RestRequest =
  | [structure: Exclude<RequestStructure, "json" | "yaml">]
  | [structure: "json" | "yaml", type: DefineObject];

export type RestDefinition<T extends RestRequest> = T[0] extends "json" | "yaml"
  ? [T[0], FromDefn<T[1]>]
  : [T[0]];

export type DefineRequestParams<
  TName extends string,
  TMode extends ApiMode,
  TPath extends UrlPath,
> = {
  /** the current configuration state of the endpoint */
  state: {
    name: Readonly<TName>;
    mode: Readonly<TMode>;
    path: Readonly<TPath>;
  };
  request: <T extends RestRequest>(...args: T) => RestDefinition<T>;
};

/**
 * We are now ready to specify the URL path to the REST endpoint
 */
export type DefineRestUrlPath<TName extends string, TMode extends RestMode> = {
  /** the current configuration state of the endpoint */
  state: {
    name: Readonly<TName>;
    mode: Readonly<TMode>;
  };
  /** specify the URL path for the REST endpoint */
  path: <TPath extends UrlPath>(
    path: TPath,
  ) => DefineRequestParams<TName, TMode, TPath>;
};

export type EndpointToken<TName extends string, TMode extends ApiMode> = {
  name: Readonly<TName>;
  mode: Readonly<TMode>;

  path: <TPath extends UrlPath>(
    path: TPath,
  ) => DefineRequestParams<TName, TMode, TPath>;
};

// export type EndpointPath<TName extends string, TMode extends ApiMode> = any;

export type EndpointMode<TName extends string> = {
  /** the current configuration state of the endpoint */
  state: {
    name: Readonly<TName>;
  };
  /** Specify the "mode" for the API. For REST API's this will be get/post/put/etc. */
  mode: <TMode extends ApiMode>(
    mode: TMode,
  ) => TMode extends RestMode
    ? DefineRestUrlPath<TName, TMode>
    : EndpointToken<TName, TMode>;
};

/**
 * Start the creation of an API endpoint with the "name" and "mode"
 */
export type EndpointConfigurator = <TName extends string>(
  name: TName,
) => EndpointMode<TName>;
