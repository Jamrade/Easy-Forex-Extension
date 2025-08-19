interface StrategyOperations {
    lightStreamer: Object;
    APIHandler: Object;
    cookieHandler: Object;
    marketElements: {
        [key: string]: HTMLElement | null;
    };
    getSelectedMarkets: () => Array<string>;
    getSelectedStrategy: () => {
        [key: string]: any;
    };
    subscribeToStrategies: () => undefined;
    displaySelectedStrategies: () => undefined;
    displayStrategyOverview: () => undefined;
}
declare class StrategyManager implements StrategyOperations {
    lightStreamer: LightstreamerHandler;
    APIHandler: APIHandler;
    cookieHandler: CookieHandler;
    marketElements: {
        [key: string]: HTMLElement | null;
    };
    constructor();
    getSelectedMarkets(): Array<string>;
    getSelectedStrategy(): {
        [key: string]: any;
    };
    initializeMarketElements(): {
        [key: string]: HTMLElement | null;
    };
    checkElement(elementId: string): HTMLElement | null;
    subscribeToStrategies(): undefined;
    displayMarketInformation(dataObject: any): undefined;
    displaySelectedStrategies(): undefined;
    displayStrategyOverview(): undefined;
}
//# sourceMappingURL=strategy.d.ts.map