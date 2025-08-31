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
    marketId: string | null;
    strategy: (dataObject: any) => any;
    constructor(strategy: (dataObject: any) => any);
    initializeMarketElements(): {
        [key: string]: HTMLElement | null;
    };
    checkElement(elementId: string): HTMLElement | null;
    subscribeToMarket(): undefined;
    completeListener(dataObject: any): any;
    displayMarketInformation(dataObject: any): undefined;
}
declare let marketStatsHandler: MarketStats;
//# sourceMappingURL=marketstats.d.ts.map