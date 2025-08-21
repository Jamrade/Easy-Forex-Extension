/* ----------- interfaces ------------*/

interface MarketOperations {

    //storageService: Object;

    APIHandler: Object;

    credentialManager: Object;

    credentials: {[key: string]: string}

    createSearchWindow: () => undefined;

    getSearchOptions: () => {[key: string]: string}

    searchMarkets: (searchType: string, searchText: string) => undefined;

    showResults:() => undefined;

    selectMarketForStrategy: () => undefined;

}

/* ----------- implementations ------------ */

class Markets implements MarketOperations {

    APIHandler: APIHandler;

    credentialManager: CredentialManager;

    credentials: {[key:string]: string}

    constructor() {
        this.APIHandler = new APIHandler()
        this.credentialManager = new CredentialManager()
        this.credentials = this.credentialManager.getCredentials()
    }

    createSearchWindow(): undefined {
        const addMarketButton: HTMLElement | null = document.getElementById("addMarket");
        addMarketButton!.remove();

        const mainContainer: HTMLElement | null = document.getElementById("marketsContainer");

        const parentDiv: HTMLElement = document.createElement("div")
        parentDiv.classList.add("marketSearchContainer")

        parentDiv.appendChild(this.createSearchParameters())
        
    }

    createSearchParameters(): HTMLElement {
        const parentDiv: HTMLElement = document.createElement("div")

        return parentDiv
    }

    searchMarkets(searchType: string, searchText: string): undefined {
        
    }

    showResults(): undefined {
        
    }

}

/* ------------- State Check ------------- */

window.addEventListener("DOMContentLoaded", () => {
    console.log("Loaded")
})