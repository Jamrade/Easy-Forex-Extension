/* ----------- interfaces ------------*/

interface MarketStatsOperations {

    lightStreamer: Object;

    APIHandler: Object;

    marketElements: {[key: string]: HTMLElement | null}
    
    initializeMarketElements: () => {[key: string]: any};

    subscribeToMarket: () => undefined;

}

/* ----------- implementations ------------ */

class MarketStats implements MarketStatsOperations {

    lightStreamer: LightstreamerHandler;

    APIHandler: APIHandler;

    marketElements: {[key: string]: HTMLElement | null};

    constructor() {
        this.lightStreamer = new LightstreamerHandler();
        this.APIHandler = new APIHandler();
        this.marketElements = {}
    }

    initializeMarketElements(): {[key: string]: HTMLElement | null}{

        const mainContainer: HTMLElement | null = document.getElementById("marketsContainer")

        const parentDiv: HTMLElement = document.createElement("div")
        parentDiv.classList.add("marketContainer")

        let statsItems: Array<string> = ["Bid", "Offer", "Split", "Price", "High", "Low", "Change", "Direction"]
        let marketElements: {[key: string]: HTMLElement} = {}

        for (let index in statsItems) {
            const marketStatsDiv: HTMLElement | null = document.createElement("div")
            marketStatsDiv.classList.add("marketStatsContainer")

            const labelElement: HTMLElement = document.createElement("h3")
            const valueElement: HTMLElement = document.createElement("p")

            let statsItem: string = statsItems[index]

            labelElement.innerHTML = statsItem

            marketElements[statsItem] = valueElement;

            marketStatsDiv.appendChild(labelElement)
            marketStatsDiv.appendChild(valueElement)

            parentDiv.appendChild(marketStatsDiv)
        }

        mainContainer!.appendChild(parentDiv)

        this.marketElements = marketElements

        return marketElements
    }


    checkElement(elementId: string): HTMLElement | null {
        let element: HTMLElement | null = document.getElementById(elementId)

        if (!element) {
            throw new Error(`Element at id ${elementId} failed to load`);
        }

        return element
    }

    subscribeToMarket(): undefined {
        let client: Object = this.lightStreamer.createClient("https://push.cityindex.com/", "STREAMINGALL")
        let subscription: Object = this.lightStreamer.createSubscription("MERGE", [`PRICES.154297`], ["Bid", "Offer", "Price", "High", "Low", "Change", "Direction", "StatusSummary"], "PRICES")
        let listener: Object = this.lightStreamer.createSubscriptionListener(this.displayMarketInformation.bind(this))

        subscription.addListener(listener);
        client.subscribe(subscription);
    }

    displayMarketInformation(dataObject: any): undefined {

        for (let key in this.marketElements) {
            if (this.marketElements) {
                try {
                    this.marketElements[key]!.innerHTML = dataObject.getValue(key);
                } catch (error) {
                    if (key != "Split") {
                        console.log(`${key} does not exist in data object`)
                    }
                }   
            }
        }

        this.marketElements["Split"]!.innerHTML = ((dataObject.getValue("Offer") - dataObject.getValue("Bid")).toFixed(5)).toString()
    }

}

/* ------------- State Check ------------- */

let marketStatsHandler: MarketStats;

window.addEventListener("DOMContentLoaded", () => {
    marketStatsHandler = new MarketStats()

    //stratTest.subscribeToStrategy()
})