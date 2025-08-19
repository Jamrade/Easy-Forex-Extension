interface MarketOperations {
    storageService: Object;
    APIHandler: Object;
    accountId: string;
    getSearchOptions: () => {
        [key: string]: any;
    };
    searchMarkets: (searchType: string, searchText: string) => Array<string>;
    displaySearchedMarkets: () => null;
}
//# sourceMappingURL=markets.d.ts.map