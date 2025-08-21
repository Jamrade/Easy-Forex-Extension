interface MarketOperations {
    apiHandler: Object;
    credentialManager: Object;
    credentials: {
        [key: string]: string;
    };
    searchMarkets: (searchType: string, searchText: string) => undefined;
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
    constructor();
    searchMarkets(searchType: string, searchText: string): undefined;
    showResults(dataObject: {
        [key: string]: string;
    }): null;
}
//# sourceMappingURL=markets.d.ts.map