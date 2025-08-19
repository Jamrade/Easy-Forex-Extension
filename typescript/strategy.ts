/* ----------- interfaces ------------*/

interface StrategyOperations {

    lightStreamer: Object;

    APIHandler: Object;

    cookieHandler: Object;

    marketElements: {[key: string]: HTMLElement | null}
    
    //tradeHandler: Object;

    getSelectedMarkets: () => Array<string>;

    getSelectedStrategy: () => {[key: string]: any}

    subscribeToStrategies: () => undefined;

    displaySelectedStrategies: () => undefined;

    displayStrategyOverview: () => undefined;

}

/* ----------- implementations ------------ */

class StrategyManager implements StrategyOperations {

    lightStreamer: LightstreamerHandler;

    APIHandler: APIHandler;

    cookieHandler: CookieHandler;

    marketElements: {[key: string]: HTMLElement | null};

    constructor() {
        this.lightStreamer = new LightstreamerHandler();
        this.APIHandler = new APIHandler();
        this.cookieHandler = new CookieHandler();
        this.marketElements = this.initializeMarketElements();
    }

    getSelectedMarkets(): Array<string> {
        return []
    }

    getSelectedStrategy(): {[key:string]: any} {
        return {}
    }

    initializeMarketElements(): {[key: string]: HTMLElement | null}{
        let marketElements: {[key: string]: HTMLElement | null} = {
            "Bid": this.checkElement("bid"),
            "Offer": this.checkElement("offer"),
            "Split": this.checkElement("split"),
            "Price": this.checkElement("price"),
            "High": this.checkElement("high"),
            "Low": this.checkElement("low"),
            "Change": this.checkElement("change"),
            "Direction": this.checkElement("direction")
        }

        return marketElements
    }


    checkElement(elementId: string): HTMLElement | null {
        let element: HTMLElement | null = document.getElementById(elementId)

        if (!element) {
            throw new Error(`Element at id ${elementId} failed to load`);
        }

        return element
    }

    subscribeToStrategies(): undefined {
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
                    console.log(`${key} does not exist in data object`)
                }   
            }
        }

        this.marketElements["Split"]!.innerHTML = ((dataObject.getValue("Offer") - dataObject.getValue("Bid")).toFixed(5)).toString()
    }
    
    
    displaySelectedStrategies(): undefined {

    }

    displayStrategyOverview(): undefined {

    }

}

/* ------------- State Check ------------- */
window.addEventListener("DOMContentLoaded", () => {
    let stratTest: StrategyManager = new StrategyManager()

    stratTest.subscribeToStrategies()
})