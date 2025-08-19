/* ----------- interfaces ------------*/

interface AccountProcesses {

    cookieHandler: Object;

    apiHandler: Object;

    lightStreamer: Object;

    accountId: string;

    statsElements: {[key: string]: any}

    getAccountId: () => string;

    subscribeToAccountStats: () => undefined;

    displayAccountStats: (dataObject: any) => undefined;

}

/* ----------- implementations ------------ */

class AccountHandler implements AccountProcesses {

    cookieHandler: CookieHandler;

    apiHandler: APIHandler;

    lightStreamer: LightstreamerHandler;

    accountId: string;

    statsElements: {[key: string]: HTMLElement | null};



    constructor() {
        this.cookieHandler = new CookieHandler()
        this.apiHandler = new APIHandler()
        this.lightStreamer = new LightstreamerHandler()
        this.accountId = this.getAccountId();
        this.statsElements = this.initializeStatsElements();
    }

    getAccountId(): string {

        let accountId: string = this.cookieHandler.searchForCookie("accountId");
        
        if (accountId == "") {
            window.location.href = "../pages/Login.html";
        }

        return accountId
    }

    initializeStatsElements(): {[key: string]: HTMLElement | null} {
        
        let statsElements: {[key: string]: HTMLElement | null} = {
            "TradeableFunds": this.checkElement("tradeableFunds"),
            "Cash": this.checkElement("cash"),
            "NetEquity": this.checkElement("equity"),
            "OpenTradeEquity": this.checkElement("profitLoss"),
            "Margin": this.checkElement("margin"),
            "MarginIndicator": this.checkElement("marginIndicator")
        }

        return statsElements
        
    }

    checkElement(elementId: string): HTMLElement | null {
        let element: HTMLElement | null = document.getElementById(elementId)

        if (!element) {
            throw new Error(`${elementId} came back null, unable to locate element`)
        }

        return element
    }

    subscribeToAccountStats(): undefined {

        let client: Object = this.lightStreamer.createClient("https://push.cityindex.com/", "STREAMINGALL")
        let subscription: Object = this.lightStreamer.createSubscription("MERGE", [`CLIENTACCOUNTMARGIN.${this.accountId}`], ["TradeableFunds", "Cash", "NetEquity", "OpenTradeEquity", "Margin", "MarginIndicator", "CurrencyISO",], "CLIENTACCOUNTMARGIN")
        let listener: Object = this.lightStreamer.createSubscriptionListener(this.displayAccountStats.bind(this))

        subscription.addListener(listener);
        client.subscribe(subscription);

    }

    displayAccountStats(dataObject: any): undefined {

        for (let key in this.statsElements) {
            if (this.statsElements[key]) {
                this.statsElements[key].innerHTML = dataObject.getValue(key)
            }
        }
    }

}

/* ------------- State Check ------------- */

window.addEventListener("DOMContentLoaded", () => {
    let accountInformation: AccountHandler = new AccountHandler()

    accountInformation.subscribeToAccountStats()
})