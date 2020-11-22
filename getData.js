var totalCost = 101000;
var totalWorth = 0;

const rp = require("request-promise");
var xrpURL = "https://api.coinmarketcap.com/v1/ticker/ripple";
var xrbURL = "https://api.coinmarketcap.com/v1/ticker/nano";
var prlURL = "https://api.coinmarketcap.com/v1/ticker/oyster";
var xlmURL = "https://api.coinmarketcap.com/v1/ticker/stellar";

const apiKey = "382cc461-422f-4e6b-802e-6078b0fb4e85";

const requestUrl =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

module.exports = {
  getPrices: async () => {
    const requestOptions = {
      method: "GET",
      uri:
        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      qs: {
        start: "1",
        limit: "5000",
        convert: "USD",
      },
      headers: {
        "X-CMC_PRO_API_KEY": apiKey,
      },
      json: true,
      gzip: true,
    };

    const { data } = await rp(requestOptions);
    const xrp = data.find((d) => d.symbol === "XRP").quote.USD;
    const xlm = data.find((d) => d.symbol === "XLM").quote.USD;
    const xrb = data.find((d) => d.symbol === "NANO").quote.USD;

    return { xrp, xlm, xrb };
  },
};
