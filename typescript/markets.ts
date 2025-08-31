/* ----------- interfaces ------------*/

interface MarketOperations {

    apiHandler: Object;

    credentialManager: Object;

    credentials: {[key: string]: string}

    createSearchSection: () => undefined;

    getParameters: () => {[key: string]: string}

    searchMarkets: () => undefined;

    showResults:(dataObject: {[key: string]: string}) => null;

}

/* ----------- implementations ------------ */

class Markets implements MarketOperations {

    apiHandler: APIHandler;

    credentialManager: CredentialManager;

    credentials: {[key:string]: string};

    parameters: Array<string>

    constructor() {
        this.apiHandler = new APIHandler()
        this.credentialManager = new CredentialManager()
        this.credentials = this.credentialManager.getCredentials()
        this.parameters = []
    }

    createSearchSection(): undefined {
        const addMarket: HTMLElement | null = document.getElementById("addMarket")
        addMarket!.remove()

        const setupContainer: HTMLElement | null = document.getElementById("setupContainer")

        const title: HTMLElement = document.createElement("h2")
        title.innerHTML = "Select Your Market"
        title.classList.add("searchTitle")
        setupContainer!.appendChild(title)

        const marketSearchContainer: HTMLElement = document.createElement("div")
        marketSearchContainer.id = "marketSearchContainer"

        marketSearchContainer.appendChild(this.createQueryElements())
        marketSearchContainer.appendChild(this.createResultsSection())

        setupContainer!.appendChild(marketSearchContainer)

    }

    createQueryElements(): HTMLElement {

        const queryContainer: HTMLElement = document.createElement("div")
        
        queryContainer.id = "queryContainer"
        
        let labels: Array<string> = ["Search Currency or Pair", "Max Results"]
        this.parameters = ["Query", "MaxResults"]

        for (let index in this.parameters) {
            const labelValueContainer: HTMLElement = document.createElement("div")
            labelValueContainer.classList.add("searchParamContainer")

            let label: string = labels[index]
            let parameter: string = this.parameters[index]

            const labelElement: HTMLElement = document.createElement("p")
            labelElement.classList.add("searchLabel")
            labelElement.innerHTML = label + " *"

            const valueElement: HTMLElement = document.createElement("input")
            valueElement.setAttribute("type", "text")
            valueElement.setAttribute("required", "true")
            valueElement.classList.add("searchInput")
            valueElement.id = parameter

            labelValueContainer.appendChild(labelElement)
            labelValueContainer.appendChild(valueElement)

            queryContainer.appendChild(labelValueContainer)
        }

        const submitButton: HTMLElement = document.createElement("button")
        submitButton.id = "marketSubmit";
        submitButton.innerHTML = "Search"
        submitButton.onclick = this.searchMarkets.bind(this)

        queryContainer.appendChild(submitButton)


        return queryContainer
    }

    createResultsSection(): HTMLElement {

        const parentContainer: HTMLElement = document.createElement("div")
        //add id here for styling

        const resultsTitle: HTMLElement = document.createElement("h3")
        resultsTitle.innerHTML = "Markets"
        //add class here for styling matching query title class
        parentContainer.appendChild(resultsTitle)

        const resultsContainer: HTMLElement = document.createElement("div")
        resultsContainer.id = "resultsContainer"
        resultsContainer.innerHTML = "Search Results Will Display Here"
        //add class here for the placeholder styling
        parentContainer.appendChild(resultsContainer)
        
        const submitButton: HTMLElement = document.createElement("button")
        submitButton.innerHTML = "Confirm Selection"
        submitButton.id = "confirmMarketButton"
        submitButton.onclick = this.submitMarketSelection.bind(this)
        //add class here additional stylilng resembling the search button
        parentContainer.appendChild(submitButton)

        return parentContainer

    }

    getParameters(): {[key: string]: string} {

        let values: {[key: string]: string} = {"SearchByMarketName": "TRUE"}

        for (let index in this.parameters) {
            let parameter: string = this.parameters[index]
            let value: string | null = (document.getElementById(parameter) as HTMLInputElement).value

            if (value != null) {
                values[parameter] = value;
            } else {
                throw new Error(`Value for parameter ${parameter}`)
            }
        }

        return values
    }

    searchMarkets(): undefined {

        const parameters: {[key: string]: string} = this.getParameters()

        let baseUrl: string = "https://ciapi.cityindex.com/TradingAPI/market/search"

        let requestUrl: string = this.apiHandler.buildQueryUrl(baseUrl, parameters)

        requestUrl += `&Username=${this.credentials.Username}&Session=${this.credentials.Session}`

        const headers = {
            "content-type": "application/json"
        }

        this.apiHandler.sendRequest(requestUrl, "GET", headers, {}, this.showResults.bind(this), (error) => {console.log(error); return null})
    }

    showResults(dataObject: {[key: string]: any}): null {

        const resultsContainer: HTMLElement | null = document.getElementById("resultsContainer")
        resultsContainer!.replaceChildren()

        const markets: Array<{[key: string]: string}> = dataObject["Markets"];

        for (let index in markets) {
            let market: {[key: string]: string} = markets[index]

            const valueContainer: HTMLElement = document.createElement("div")
            valueContainer.classList.add("marketValueContainer")

            const marketSelector: HTMLElement = document.createElement("input")
            marketSelector.setAttribute("name", "market")
            marketSelector.setAttribute("type", "radio")
            marketSelector.setAttribute("value", `${market.MarketId}`)
            marketSelector.id = `${market.Name}`

            const marketLabel: HTMLElement = document.createElement("label")
            marketLabel.innerHTML = `${market.Name}`
            marketLabel.setAttribute("for", `${market.Name}`)
            
            valueContainer.appendChild(marketSelector)
            valueContainer.appendChild(marketLabel)

            resultsContainer!.appendChild(valueContainer)
            
        }

        return null;
    }

    submitMarketSelection(): null {
        const markets: NodeListOf<HTMLElement> | null = document.getElementsByName("market");

        for (let market in markets) {
            const potentiallySelected: HTMLInputElement = markets[market] as HTMLInputElement;

            if (potentiallySelected.checked) {
                localStorage.setItem("market", `${potentiallySelected.value}`);
                
                const strategySelector: Strategy = new Strategy()
                strategySelector.createFileUploadElements()

                break;
            }
        }

        return null
    }

}


/* ------------- State Check ------------- */

let marketSearch: Markets;

window.addEventListener("DOMContentLoaded", () => {
    marketSearch = new Markets()

    // marketSearch.searchMarkets()
})