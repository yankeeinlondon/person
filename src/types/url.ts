export type Protocol = "http://" | "https://";
export type RelativeLeader = "/";

/**
 * A basic representation of a network API's URL/URI.
 *
 * **Note:** if an API has a _path parameter_ then this would
 * be embedded into this URL and the dynamic segment would be
 * delimited by curly braces. For example:
 * ```ts
 * const url: Url = `https://somewhere.com/api/v1/{name}`;
 * ```
 * - in this example we have a dynamic "name" segment at the
 * end of the URL.
 *
 * **Note:** while all fully-qualified URL's should include the
 * protocol, we do allow for a "BaseUrl" in many parts of the API
 * and in these cases we will allow relative paths which exclude
 * the need for the protocol. All relative paths, however, should
 * lead with the `/` character.
 */
export type UrlPath<
  TBase extends `${Protocol}${string}` | undefined = undefined,
> = undefined extends TBase
  ? TBase extends undefined
    ? `${Protocol}${string}`
    : `${RelativeLeader}${string}` | `${TBase}${string}`
  : `${RelativeLeader}${string}` | `${TBase}${string}`;
