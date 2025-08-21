/* ----------- interfaces ------------*/

interface MarketOperations {

    //storageService: Object;

    apiHandler: Object;

    credentialManager: Object;

    credentials: {[key: string]: string}

    //createSearchWindow: () => undefined;

    //getSearchOptions: () => {[key: string]: string}

    searchMarkets: (searchType: string, searchText: string) => undefined;

    showResults:(dataObject: {[key: string]: string}) => null;

    //selectMarketForStrategy: () => undefined;

}

/* ----------- implementations ------------ */

class Markets implements MarketOperations {

    apiHandler: APIHandler;

    credentialManager: CredentialManager;

    credentials: {[key:string]: string}

    constructor() {
        this.apiHandler = new APIHandler()
        this.credentialManager = new CredentialManager()
        this.credentials = this.credentialManager.getCredentials()
    }

    createSearchElements(): undefined {}

    searchMarkets(searchType: string, searchText: string): undefined {
        let baseUrl: string = "https://ciapi.cityindex.com/TradingAPI/market/search"

        let requestUrl: string = this.apiHandler.buildQueryUrl(baseUrl, {"SearchByMarketName": "TRUE", "Query": "USD", "MaxResults": "10"})

        requestUrl += `&Username=${this.credentials.Username}&Session=${this.credentials.Session}`

        const headers = {
            "content-type": "application/json"
        }

        this.apiHandler.sendRequest(requestUrl, "GET", headers, {}, this.showResults.bind(this), (error) => {console.log(error); return null})
    }

    showResults(dataObject: {[key: string]: string}): null {
        console.log(dataObject)
        return null
    }

}

/* ------------- State Check ------------- */

window.addEventListener("DOMContentLoaded", () => {
    let marketSearch: Markets = new Markets()

    marketSearch.searchMarkets("Some Text", "Other Text")
})