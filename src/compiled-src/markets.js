"use strict";
/* ----------- interfaces ------------*/
/* ----------- implementations ------------ */
class Markets {
    apiHandler;
    credentialManager;
    credentials;
    parameters;
    constructor() {
        this.apiHandler = new APIHandler();
        this.credentialManager = new CredentialManager();
        this.credentials = this.credentialManager.getCredentials();
        this.parameters = [];
    }
    createSearchSection() {
        const addMarket = document.getElementById("addMarket");
        addMarket.remove();
        const setupContainer = document.getElementById("setupContainer");
        const title = document.createElement("h2");
        title.innerHTML = "Select Your Market";
        title.classList.add("searchTitle");
        setupContainer.appendChild(title);
        const marketSearchContainer = document.createElement("div");
        marketSearchContainer.id = "marketSearchContainer";
        marketSearchContainer.appendChild(this.createQueryElements());
        marketSearchContainer.appendChild(this.createResultsSection());
        setupContainer.appendChild(marketSearchContainer);
    }
    createQueryElements() {
        const queryContainer = document.createElement("div");
        queryContainer.id = "queryContainer";
        let labels = ["Search Currency or Pair", "Max Results"];
        this.parameters = ["Query", "MaxResults"];
        for (let index in this.parameters) {
            const labelValueContainer = document.createElement("div");
            labelValueContainer.classList.add("searchParamContainer");
            let label = labels[index];
            let parameter = this.parameters[index];
            const labelElement = document.createElement("p");
            labelElement.classList.add("searchLabel");
            labelElement.innerHTML = label + " *";
            const valueElement = document.createElement("input");
            valueElement.setAttribute("type", "text");
            valueElement.setAttribute("required", "true");
            valueElement.classList.add("searchInput");
            valueElement.id = parameter;
            labelValueContainer.appendChild(labelElement);
            labelValueContainer.appendChild(valueElement);
            queryContainer.appendChild(labelValueContainer);
        }
        const submitButton = document.createElement("button");
        submitButton.id = "marketSubmit";
        submitButton.innerHTML = "Search";
        submitButton.onclick = this.searchMarkets.bind(this);
        queryContainer.appendChild(submitButton);
        return queryContainer;
    }
    createResultsSection() {
        const parentContainer = document.createElement("div");
        //add id here for styling
        const resultsTitle = document.createElement("h3");
        resultsTitle.innerHTML = "Markets";
        //add class here for styling matching query title class
        parentContainer.appendChild(resultsTitle);
        const resultsContainer = document.createElement("div");
        resultsContainer.id = "resultsContainer";
        resultsContainer.innerHTML = "Search Results Will Display Here";
        //add class here for the placeholder styling
        parentContainer.appendChild(resultsContainer);
        const submitButton = document.createElement("button");
        submitButton.innerHTML = "Confirm Selection";
        submitButton.id = "confirmMarketButton";
        submitButton.onclick = this.submitMarketSelection.bind(this);
        //add class here additional stylilng resembling the search button
        parentContainer.appendChild(submitButton);
        return parentContainer;
    }
    getParameters() {
        let values = { "SearchByMarketName": "TRUE" };
        for (let index in this.parameters) {
            let parameter = this.parameters[index];
            let value = document.getElementById(parameter).value;
            if (value != null) {
                values[parameter] = value;
            }
            else {
                throw new Error(`Value for parameter ${parameter}`);
            }
        }
        return values;
    }
    searchMarkets() {
        const parameters = this.getParameters();
        let baseUrl = "https://ciapi.cityindex.com/TradingAPI/market/search";
        let requestUrl = this.apiHandler.buildQueryUrl(baseUrl, parameters);
        requestUrl += `&Username=${this.credentials.Username}&Session=${this.credentials.Session}`;
        const headers = {
            "content-type": "application/json"
        };
        this.apiHandler.sendRequest(requestUrl, "GET", headers, {}, this.showResults.bind(this), (error) => { console.log(error); return null; });
    }
    showResults(dataObject) {
        const resultsContainer = document.getElementById("resultsContainer");
        resultsContainer.replaceChildren();
        const markets = dataObject["Markets"];
        for (let index in markets) {
            let market = markets[index];
            const valueContainer = document.createElement("div");
            valueContainer.classList.add("marketValueContainer");
            const marketSelector = document.createElement("input");
            marketSelector.setAttribute("name", "market");
            marketSelector.setAttribute("type", "radio");
            marketSelector.setAttribute("value", `${market.MarketId}`);
            marketSelector.id = `${market.Name}`;
            const marketLabel = document.createElement("label");
            marketLabel.innerHTML = `${market.Name}`;
            marketLabel.setAttribute("for", `${market.Name}`);
            valueContainer.appendChild(marketSelector);
            valueContainer.appendChild(marketLabel);
            resultsContainer.appendChild(valueContainer);
        }
        return null;
    }
    submitMarketSelection() {
        const markets = document.getElementsByName("market");
        for (let market in markets) {
            const potentiallySelected = markets[market];
            if (potentiallySelected.checked) {
                localStorage.setItem("market", `${potentiallySelected.value}`);
                const strategySelector = new Strategy();
                strategySelector.createFileUploadElements();
                break;
            }
        }
        return null;
    }
}
/* ------------- State Check ------------- */
let marketSearch;
window.addEventListener("DOMContentLoaded", () => {
    marketSearch = new Markets();
    // marketSearch.searchMarkets()
});
//# sourceMappingURL=markets.js.map