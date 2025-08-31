interface MarketOperations {
    apiHandler: Object;
    credentialManager: Object;
    credentials: {
        [key: string]: string;
    };
    createSearchSection: () => undefined;
    getParameters: () => {
        [key: string]: string;
    };
    searchMarkets: () => undefined;
    showResults: (dataObject: {
        [key: string]: string;
    }) => null;
}
declare class Markets implements MarketOperations {
    apiHandler: APIHandler;
    credentialManager: CredentialManager;
    credentials: {
        [key: string]: string;
    };
    parameters: Array<string>;
    constructor();
    createSearchSection(): undefined;
    createQueryElements(): HTMLElement;
    createResultsSection(): HTMLElement;
    getParameters(): {
        [key: string]: string;
    };
    searchMarkets(): undefined;
    showResults(dataObject: {
        [key: string]: any;
    }): null;
    submitMarketSelection(): null;
}
declare let marketSearch: Markets;
//# sourceMappingURL=markets.d.ts.map