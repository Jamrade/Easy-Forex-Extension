"use strict";
/* ----------- interfaces ------------*/
/* ----------- implementations ------------ */
class Markets {
    APIHandler;
    credentialManager;
    credentials;
    constructor() {
        this.APIHandler = new APIHandler();
        this.credentialManager = new CredentialManager();
        this.credentials = this.credentialManager.getCredentials();
    }
    searchMarkets(searchType, searchText) {
    }
}
/* ------------- State Check ------------- */
window.addEventListener("DOMContentLoaded", () => {
    console.log("Loaded");
});
//# sourceMappingURL=markets.js.map