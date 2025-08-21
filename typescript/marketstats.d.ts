interface MarketStatsOperations {
    lightStreamer: Object;
    APIHandler: Object;
    marketElements: {
        [key: string]: HTMLElement | null;
    };
    initializeMarketElements: () => {
        [key: string]: any;
    };
    subscribeToMarket: () => undefined;
}
declare class MarketStats implements MarketStatsOperations {
    lightStreamer: LightstreamerHandler;
    APIHandler: APIHandler;
    marketElements: {
        [key: string]: HTMLElement | null;
    };
    constructor();
    initializeMarketElements(): {
        [key: string]: HTMLElement | null;
    };
    checkElement(elementId: string): HTMLElement | null;
    subscribeToMarket(): undefined;
    displayMarketInformation(dataObject: any): undefined;
}
declare let marketStatsHandler: MarketStats;
//# sourceMappingURL=marketstats.d.ts.map