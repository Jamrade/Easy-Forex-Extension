/* ----------- interfaces ------------*/

interface MarketOperations {

    storageService: Object;

    APIHandler: Object;

    accountId: string;

    getSearchOptions: () => {[key: string]: any};

    searchMarkets: (searchType: string, searchText: string) => Array<string>;

    displaySearchedMarkets: () => undefined;

}

/* ----------- implementations ------------ */

/* ------------- State Check ------------- */

window.addEventListener("DOMContentLoaded", () => {
    console.log("Loaded")
})