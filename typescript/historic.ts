/* ----------- interfaces ------------*/

interface HistoricOperations {

    apiHandler: Object;

    cookieHandler: Object;

    getHistoricAfterDate: (interval: string, span: number, maxReturn: number, unixTimeStamp: string, marketId: string) => undefined;

    getHistoricBeforeDate: (interval: string, span: number, maxReturn: number, marketId: string) => undefined;

    getMostRecentBars: (interval: string, span: number, numberOfBars: number, marketId: string) => undefined;

    getTimeDelta: (interval: string, span: number, desiredDelta: number) => string;

}

/* ----------- implementations ------------ */

class HistoricPrices implements HistoricOperations {

    apiHandler: APIHandler;

    cookieHandler: CookieHandler;

    constructor() {
        this.apiHandler = new APIHandler()
        this.cookieHandler = new CookieHandler()
    }

    getTimeDelta(interval: string, span: number, desiredDelta: number): string {

        let time: Date = new Date()

        switch(interval) {
            case "MINUTE":
                let currentMinutes: number = time.getUTCMinutes()
                time.setUTCMinutes(currentMinutes - (desiredDelta * span))
                break;
            case "HOUR":
                let currentHours: number = time.getUTCHours()
                time.setUTCHours(currentHours - (desiredDelta * span))
                break;
            case "DAY":
                let currentDay: number = time.getUTCDate()
                time.setUTCDate(currentDay - (desiredDelta * span))
                break;
            case "MONTH":
                let currentMonth: number = time.getUTCMonth()
                time.setUTCMonth(currentMonth - (desiredDelta * span))
                break;
            case "YEAR":
                let currentYear: number = time.getUTCFullYear()
                time.setUTCFullYear(currentYear - (desiredDelta * span))
                break;
            default:
                console.log(`${interval} is not a valid interval`)
                break;
        }

        let unixTimestamp: number;

        try {
            unixTimestamp = Math.floor(time.getTime()/1000);
        } catch {
            throw new Error(`Unable to convert ${time} into a unix timestamp`);
        }

        return unixTimestamp.toString()
    }

    createRequest(requestUrl: string): undefined {

        let username: string = this.cookieHandler.searchForCookie("Username")
        let session: string = this.cookieHandler.searchForCookie("Session")

        requestUrl += `&Username=${username}&Session=${session}`

        let headers = {
            "content-type": "application/json"
        }

        this.apiHandler.sendRequest(requestUrl,"GET",headers,{},(data) => {console.log(data); return null}, (error) => {console.log(error); return null})

    }

    getHistoricAfterDate(interval: string, span: number, maxReturn: number, unixTimeStamp: string, marketId: string): undefined {

        let baseUrl: string = `https://ciapi.cityindex.com/TradingAPI/market/${marketId}/barhistoryafter`
        
        let requestUrl = this.apiHandler.buildQueryUrl(baseUrl,{"interval":interval, "span":span.toString(), "fromTimestampUTC": unixTimeStamp})

        this.createRequest(requestUrl)

    }

    getHistoricBeforeDate(interval: string, span: number, maxReturn: number, marketId: string): undefined {
        //To be implemented if needed
    }

    getMostRecentBars(interval: string, span: number, numberOfBars: number, marketId: string): undefined {

        let baseUrl: string = `https://ciapi.cityindex.com/TradingAPI/market/${marketId}/barhistory`

        let requestUrl = this.apiHandler.buildQueryUrl(baseUrl, {"interval": interval, "span": span.toString(), "PriceBars": numberOfBars.toString()})

        this.createRequest(requestUrl)
    }

}

/* ------------- State Check ------------- */
window.addEventListener("DOMContentLoaded", () => {
    let historic: HistoricPrices = new HistoricPrices()

    let timeStamp: string = historic.getTimeDelta("MONTH", 1, 1)

    
    historic.getHistoricAfterDate("MINUTE", 15, 4000, timeStamp, "154297")
    historic.getMostRecentBars("MINUTE", 15, 25, "154297")
})