// [Social Searcher API](https://www.social-searcher.com/api/)
// FREE and PAID
// FREE is 100 real-time searchs per day
// PAID broken into REGULAR and PROFESSIONAL
//   - REGULAR (€8.49/mo) provides
//     - 400 real-time search per day
//     - 5 email alerts
//     - 5 monitors
//     - 20,000 cached results
//     -  1,000 cached results for premium (twitter only?)
//   PROFESSIONAL (€19.49/mo) provides:
//     - 800 real-time searches per day
//     - 10 email alerts
//     - 10 monitors
//     - 100,000 cached results
//     -   5,000 premium caches (twitter?)
//
// Base URL: https://api.social-searcher.com/v2/search

export const socialSearcher = createEndpoint("social-searcher")
  .mode("get")
  .url("https://api.social-searcher.com/v2/search")
  .inputStructure("json")
  .inputType({
    q: "string",
    limit: "Opt<number>",
    /**
     * Allows to skip a number of results for pagination. This parameter
     * should be increased when you want to go deeper in the data.
     */
    page: "Opt<number>",
    /** Mandatory in case of pagination. */
    requestid: "Opt<string>",
    /**
     * Social network for which you want to get data. “all” - results from
     * all networks (billed as 1 request/network). Several networks for searching
     * should be comma separated, eg. “web,...".
     */
    network: "Opt<enum(all,web)>",
    /**
     *
     */
    lang: "Opt<enum(en,fr,it,de)>",

    /**
     *
     */
    type: "Opt<enum(video,photo,status,link)>",
  })

  .inputMap((keys: string[]) => {
    return { urlParams: keys };
  })
  .responseType({})
  .auth("key-value", "key");
