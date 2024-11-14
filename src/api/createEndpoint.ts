import { isUndefined, Narrowable, Never } from "inferred-types";
import {
  EndpointConfigurator,
  EndpointBuilderApi,
  HideDefined,
  EndpointMode,
  DefineRestUrlPath,
  EndpointToken,
  DefineRequestParams,
} from "../types/createEndpoint-types";
import { ApiMode, RestMode, UrlPath } from "../types/index";
import { isRestMode } from "../type-guards";

export const hide = <
  TVal,
  TOtherwise extends <T extends TVal>(
    val: T,
  ) => EndpointBuilderApi<any, any, any, any, any>,
>(
  val: TVal,
  otherwise: TOtherwise,
): HideOnceDefined<TVal, TOtherwise> => {
  return (isUndefined(val) ? otherwise : Never) as HideOnceDefined<
    TVal,
    TOtherwise
  >;
};

const builder = <
  TName extends string,
  TMode extends ApiMode,
  TUrl extends UrlPath | undefined,
  TReq extends Narrowable | undefined,
  TResp extends Narrowable | undefined,
>(
  name: TName,
  mode: TMode,
  url?: TUrl,
  req?: TReq,
  resp?: TResp,
): EndpointBuilderApi<TName, TMode, TUrl, TReq, TResp> => {
  return {
    state: {
      name,
      mode,
      url,
      req,
      resp,
    },
    url: (val) => {
      return builder(name, mode, val, req, resp);
    },
    requestType: (val) => {
      return builder(name, mode, url, val, resp);
    },
    responseType: (val) => {
      return builder(name, mode, url, req, val);
    },
  } as HideDefined<EndpointBuilderApi<TName, TMode, TUrl, TReq, TResp>>;
};

const token = <TName extends string, TMode extends "Websocket">(
  name: TName,
  mode: TMode,
): EndpointToken<TName, TMode> => {};

const request = <
  TName extends string,
  TMode extends RestMode,
  TPath extends UrlPath,
>(
  name: TName,
  mode: TMode,
  path: TPath,
): DefineRequestParams<TName, TMode, TPath> => ({
  name,
  mode,
  path,
});

const path = <TName extends string, TMode extends RestMode>(
  name: TName,
  mode: TMode,
): DefineRestUrlPath<TName, TMode> => ({
  state: {
    name,
    mode,
  },
  path: (val) => {
    return request(name, mode, val);
  },
});

/**
 * now specify the "mode", which is get/put/post/etc for a REST endpoint
 */
const mode = <
  TName extends string, //
>(
  name: TName,
): EndpointMode<TName> => ({
  state: {
    name,
  },
  mode: (val) => {
    return isRestMode(val) ? path(name, val) : token(name, val);
  },
});

/**
 * Start the creation of an API endpoint with the "name" of the endpoint
 */
export const createEndpoint: EndpointConfigurator = (name) => mode(name);

const a = createEndpoint("foobar") //
  .mode("get")
  .path("https://foo.bar")
  .request("json", {
    foo: "string",
  });

// createEndpoint("foobar")
//    .endpoint("get", "https://foobar.com")
//    .endpoint("")
//    .request("json", {  })
//    .response("json", { })
//    .mapTo()
