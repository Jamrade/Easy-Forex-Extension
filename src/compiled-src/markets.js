"use strict";
/* ----------- interfaces ------------*/
/* ----------- implementations ------------ */
class Markets {
    apiHandler;
    credentialManager;
    credentials;
    constructor() {
        this.apiHandler = new APIHandler();
        this.credentialManager = new CredentialManager();
        this.credentials = this.credentialManager.getCredentials();
    }
    searchMarkets(searchType, searchText) {
        let baseUrl = "https://ciapi.cityindex.com/TradingAPI/market/search";
        let requestUrl = this.apiHandler.buildQueryUrl(baseUrl, { "SearchByMarketName": "TRUE", "Query": "USD", "MaxResults": "10" });
        requestUrl += `&Username=${this.credentials.Username}&Session=${this.credentials.Session}`;
        const headers = {
            "content-type": "application/json"
        };
        this.apiHandler.sendRequest(requestUrl, "GET", headers, {}, this.showResults.bind(this), (error) => { console.log(error); return null; });
    }
    showResults(dataObject) {
        console.log(dataObject);
        return null;
    }
}
/* ------------- State Check ------------- */
window.addEventListener("DOMContentLoaded", () => {
    let marketSearch = new Markets();
    marketSearch.searchMarkets("Some Text", "Other Text");
});
//# sourceMappingURL=markets.js.map