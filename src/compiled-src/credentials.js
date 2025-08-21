"use strict";
/* ----------- interfaces ------------*/
/* ----------- implementations ------------ */
class CredentialManager {
    cookieHandler;
    constructor() {
        this.cookieHandler = new CookieHandler();
    }
    getCredentials() {
        let credentialTags = ["Username", "Session", "accountId"];
        let credentials = {};
        for (let index in credentialTags) {
            let key = credentialTags[index];
            let value = this.cookieHandler.searchForCookie(key);
            if (value === "") {
                window.location.href = "../pages/Login.html";
            }
            credentials[key] = value;
        }
        return credentials;
    }
}
/* ------------- State Check ------------- */
window.addEventListener("DOMContentLoaded", () => {
    let credentials = new CredentialManager;
    console.log(credentials.getCredentials());
});
//# sourceMappingURL=credentials.js.map