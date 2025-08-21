interface MarketOperations {
    APIHandler: Object;
    credentialManager: Object;
    credentials: {
        [key: string]: string;
    };
    searchMarkets: (searchType: string, searchText: string) => undefined;
}
declare class Markets implements MarketOperations {
    APIHandler: APIHandler;
    credentialManager: CredentialManager;
    credentials: {
        [key: string]: string;
    };
    constructor();
    searchMarkets(searchType: string, searchText: string): undefined;
}
//# sourceMappingURL=markets.d.ts.map