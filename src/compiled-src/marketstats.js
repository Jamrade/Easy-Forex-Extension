"use strict";
/* ----------- interfaces ------------*/
/* ----------- implementations ------------ */
class MarketStats {
    lightStreamer;
    APIHandler;
    marketElements;
    marketId;
    strategy;
    constructor(strategy) {
        this.lightStreamer = new LightstreamerHandler();
        this.APIHandler = new APIHandler();
        this.marketElements = {};
        this.marketId = localStorage.getItem("market");
        this.strategy = strategy;
    }
    initializeMarketElements() {
        const mainContainer = document.getElementById("setupContainer");
        mainContainer.replaceChildren();
        const parentDiv = document.createElement("div");
        parentDiv.classList.add("marketContainer");
        let statsItems = ["Bid", "Offer", "Split", "Price", "High", "Low", "Change", "Direction"];
        let marketElements = {};
        for (let index in statsItems) {
            const marketStatsDiv = document.createElement("div");
            marketStatsDiv.classList.add("marketStatsContainer");
            const labelElement = document.createElement("h3");
            const valueElement = document.createElement("p");
            let statsItem = statsItems[index];
            labelElement.innerHTML = statsItem;
            marketElements[statsItem] = valueElement;
            marketStatsDiv.appendChild(labelElement);
            marketStatsDiv.appendChild(valueElement);
            parentDiv.appendChild(marketStatsDiv);
        }
        mainContainer.appendChild(parentDiv);
        this.marketElements = marketElements;
        return marketElements;
    }
    checkElement(elementId) {
        let element = document.getElementById(elementId);
        if (!element) {
            throw new Error(`Element at id ${elementId} failed to load`);
        }
        return element;
    }
    subscribeToMarket() {
        let client = this.lightStreamer.createClient("https://push.cityindex.com/", "STREAMINGALL");
        let subscription = this.lightStreamer.createSubscription("MERGE", [`PRICES.${this.marketId}`], ["Bid", "Offer", "Price", "High", "Low", "Change", "Direction", "StatusSummary"], "PRICES");
        let listener = this.lightStreamer.createSubscriptionListener(this.completeListener.bind(this));
        subscription.addListener(listener);
        client.subscribe(subscription);
    }
    completeListener(dataObject) {
        this.displayMarketInformation(dataObject);
        this.strategy(dataObject).bind(this);
    }
    displayMarketInformation(dataObject) {
        for (let key in this.marketElements) {
            if (this.marketElements) {
                try {
                    this.marketElements[key].innerHTML = dataObject.getValue(key);
                }
                catch (error) {
                    if (key != "Split") {
                        console.log(`${key} does not exist in data object`);
                    }
                }
            }
        }
        this.marketElements["Split"].innerHTML = ((dataObject.getValue("Offer") - dataObject.getValue("Bid")).toFixed(5)).toString();
    }
}
/* ------------- State Check ------------- */
let marketStatsHandler;
window.addEventListener("DOMContentLoaded", () => {
    //marketStatsHandler = new MarketStats()
    //stratTest.subscribeToStrategy()
});
//# sourceMappingURL=marketstats.js.map