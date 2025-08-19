"use strict";
/* ----------- interfaces ------------*/
/* ----------- implementations ------------ */
class HistoricPrices {
    apiHandler;
    cookieHandler;
    constructor() {
        this.apiHandler = new APIHandler();
        this.cookieHandler = new CookieHandler();
    }
    getTimeDelta(interval, span, desiredDelta) {
        let time = new Date();
        switch (interval) {
            case "MINUTE":
                let currentMinutes = time.getUTCMinutes();
                time.setUTCMinutes(currentMinutes - (desiredDelta * span));
                break;
            case "HOUR":
                let currentHours = time.getUTCHours();
                time.setUTCHours(currentHours - (desiredDelta * span));
                break;
            case "DAY":
                let currentDay = time.getUTCDate();
                time.setUTCDate(currentDay - (desiredDelta * span));
                break;
            case "MONTH":
                let currentMonth = time.getUTCMonth();
                time.setUTCMonth(currentMonth - (desiredDelta * span));
                break;
            case "YEAR":
                let currentYear = time.getUTCFullYear();
                time.setUTCFullYear(currentYear - (desiredDelta * span));
                break;
            default:
                console.log(`${interval} is not a valid interval`);
                break;
        }
        let unixTimestamp;
        try {
            unixTimestamp = Math.floor(time.getTime() / 1000);
        }
        catch {
            throw new Error(`Unable to convert ${time} into a unix timestamp`);
        }
        return unixTimestamp.toString();
    }
    createRequest(requestUrl) {
        let username = this.cookieHandler.searchForCookie("Username");
        let session = this.cookieHandler.searchForCookie("Session");
        requestUrl += `&Username=${username}&Session=${session}`;
        let headers = {
            "content-type": "application/json"
        };
        this.apiHandler.sendRequest(requestUrl, "GET", headers, {}, (data) => { console.log(data); return null; }, (error) => { console.log(error); return null; });
    }
    getHistoricAfterDate(interval, span, maxReturn, unixTimeStamp, marketId) {
        let baseUrl = `https://ciapi.cityindex.com/TradingAPI/market/${marketId}/barhistoryafter`;
        let requestUrl = this.apiHandler.buildQueryUrl(baseUrl, { "interval": interval, "span": span.toString(), "fromTimestampUTC": unixTimeStamp });
        this.createRequest(requestUrl);
    }
    getHistoricBeforeDate(interval, span, maxReturn, marketId) {
    }
    getMostRecentBars(interval, span, numberOfBars, marketId) {
        let baseUrl = `https://ciapi.cityindex.com/TradingAPI/market/${marketId}/barhistory`;
        let requestUrl = this.apiHandler.buildQueryUrl(baseUrl, { "interval": interval, "span": span.toString(), "PriceBars": numberOfBars.toString() });
        this.createRequest(requestUrl);
    }
}
/* ------------- State Check ------------- */
window.addEventListener("DOMContentLoaded", () => {
    let historic = new HistoricPrices();
    let timeStamp = historic.getTimeDelta("MONTH", 1, 1);
    historic.getHistoricAfterDate("MINUTE", 15, 4000, timeStamp, "154297");
    historic.getMostRecentBars("MINUTE", 15, 25, "154297");
});
//# sourceMappingURL=historic.js.map