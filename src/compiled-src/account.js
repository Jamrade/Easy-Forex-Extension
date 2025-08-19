"use strict";
/* ----------- interfaces ------------*/
/* ----------- implementations ------------ */
class AccountHandler {
    cookieHandler;
    apiHandler;
    lightStreamer;
    accountId;
    statsElements;
    constructor() {
        this.cookieHandler = new CookieHandler();
        this.apiHandler = new APIHandler();
        this.lightStreamer = new LightstreamerHandler();
        this.accountId = this.getAccountId();
        this.statsElements = this.initializeStatsElements();
    }
    getAccountId() {
        let accountId = this.cookieHandler.searchForCookie("accountId");
        if (accountId == "") {
            window.location.href = "../pages/Login.html";
        }
        return accountId;
    }
    initializeStatsElements() {
        let statsElements = {
            "TradeableFunds": this.checkElement("tradeableFunds"),
            "Cash": this.checkElement("cash"),
            "NetEquity": this.checkElement("equity"),
            "OpenTradeEquity": this.checkElement("profitLoss"),
            "Margin": this.checkElement("margin"),
            "MarginIndicator": this.checkElement("marginIndicator")
        };
        return statsElements;
    }
    checkElement(elementId) {
        let element = document.getElementById(elementId);
        if (!element) {
            throw new Error(`${elementId} came back null, unable to locate element`);
        }
        return element;
    }
    subscribeToAccountStats() {
        let client = this.lightStreamer.createClient("https://push.cityindex.com/", "STREAMINGALL");
        let subscription = this.lightStreamer.createSubscription("MERGE", [`CLIENTACCOUNTMARGIN.${this.accountId}`], ["TradeableFunds", "Cash", "NetEquity", "OpenTradeEquity", "Margin", "MarginIndicator", "CurrencyISO",], "CLIENTACCOUNTMARGIN");
        let listener = this.lightStreamer.createSubscriptionListener(this.displayAccountStats.bind(this));
        subscription.addListener(listener);
        client.subscribe(subscription);
    }
    displayAccountStats(dataObject) {
        for (let key in this.statsElements) {
            if (this.statsElements[key]) {
                this.statsElements[key].innerHTML = dataObject.getValue(key);
            }
        }
    }
}
/* ------------- State Check ------------- */
window.addEventListener("DOMContentLoaded", () => {
    let accountInformation = new AccountHandler();
    accountInformation.subscribeToAccountStats();
});
//# sourceMappingURL=account.js.map