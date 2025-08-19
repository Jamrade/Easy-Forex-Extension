"use strict";
/* ----------- interfaces ------------*/
/* ----------- implementations ------------ */
class StrategyManager {
    lightStreamer;
    APIHandler;
    cookieHandler;
    marketElements;
    constructor() {
        this.lightStreamer = new LightstreamerHandler();
        this.APIHandler = new APIHandler();
        this.cookieHandler = new CookieHandler();
        this.marketElements = this.initializeMarketElements();
    }
    getSelectedMarkets() {
        return [];
    }
    getSelectedStrategy() {
        return {};
    }
    initializeMarketElements() {
        let marketElements = {
            "Bid": this.checkElement("bid"),
            "Offer": this.checkElement("offer"),
            "Split": this.checkElement("split"),
            "Price": this.checkElement("price"),
            "High": this.checkElement("high"),
            "Low": this.checkElement("low"),
            "Change": this.checkElement("change"),
            "Direction": this.checkElement("direction")
        };
        return marketElements;
    }
    checkElement(elementId) {
        let element = document.getElementById(elementId);
        if (!element) {
            throw new Error(`Element at id ${elementId} failed to load`);
        }
        return element;
    }
    subscribeToStrategies() {
        let client = this.lightStreamer.createClient("https://push.cityindex.com/", "STREAMINGALL");
        let subscription = this.lightStreamer.createSubscription("MERGE", [`PRICES.154297`], ["Bid", "Offer", "Price", "High", "Low", "Change", "Direction", "StatusSummary"], "PRICES");
        let listener = this.lightStreamer.createSubscriptionListener(this.displayMarketInformation.bind(this));
        subscription.addListener(listener);
        client.subscribe(subscription);
    }
    displayMarketInformation(dataObject) {
        for (let key in this.marketElements) {
            if (this.marketElements) {
                try {
                    this.marketElements[key].innerHTML = dataObject.getValue(key);
                }
                catch (error) {
                    console.log(`${key} does not exist in data object`);
                }
            }
        }
        this.marketElements["Split"].innerHTML = ((dataObject.getValue("Offer") - dataObject.getValue("Bid")).toFixed(5)).toString();
    }
    displaySelectedStrategies() {
    }
    displayStrategyOverview() {
    }
}
/* ------------- State Check ------------- */
window.addEventListener("DOMContentLoaded", () => {
    let stratTest = new StrategyManager();
    stratTest.subscribeToStrategies();
});
//# sourceMappingURL=strategy.js.map