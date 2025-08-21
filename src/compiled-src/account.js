"use strict";
/* ----------- interfaces ------------*/
/* ----------- implementations ------------ */
class AccountHandler {
    credentialManager;
    apiHandler;
    lightStreamer;
    credentials;
    statsElements;
    constructor() {
        this.apiHandler = new APIHandler();
        this.lightStreamer = new LightstreamerHandler();
        this.credentialManager = new CredentialManager();
        this.credentials = this.credentialManager.getCredentials();
        this.statsElements = this.initializeStatsElements();
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
        let subscription = this.lightStreamer.createSubscription("MERGE", [`CLIENTACCOUNTMARGIN.${this.credentials.accountId}`], ["TradeableFunds", "Cash", "NetEquity", "OpenTradeEquity", "Margin", "MarginIndicator", "CurrencyISO",], "CLIENTACCOUNTMARGIN");
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