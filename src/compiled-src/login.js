"use strict";
/* ----------- interfaces ------------*/
/* ----------- implementations ------------ */
class Login {
    cookieManager;
    apiHandler;
    constructor() {
        this.apiHandler = new APIHandler();
        this.cookieManager = {};
    }
    getCredentials() {
        const credentials = {};
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const appKey = document.getElementById("appKey").value;
        if (this.inputValidator([username, password, appKey])) {
            credentials["username"] = username;
            credentials["password"] = password;
            credentials["appKey"] = appKey;
        }
        return credentials;
    }
    inputValidator(valuesToTest) {
        for (let index in valuesToTest) {
            let value = valuesToTest[index];
            if (value.length == 0) {
                console.log("Implement Error Message");
                throw Error("One or more inputs are empty");
            }
            else if (value.length > 64) {
                console.log("Implement Error Message");
                throw Error("One or more inputs are too long");
            }
        }
        return true;
    }
    saveSessionInfo(response) {
        // session manager call here
        return null;
    }
    requestAuthorization() {
        const credentials = this.getCredentials();
        const url = "https://ciapi.cityindex.com/v2/Session";
        const method = "POST";
        const body = {
            "Password": credentials.password,
            "AppVersion": "1",
            "AppComments": "",
            "UserName": credentials.username,
            "AppKey": credentials.appKey
        };
        const header = {
            "content-type": "application/json"
        };
        this.apiHandler.sendRequest(url, method, header, body, this.saveSessionInfo, this.displayError);
        return null;
    }
    displayError(errorMessage) {
        return null;
    }
    getAccountId(sessionToken, username) {
        return "";
    }
    navigateToHomepage() {
        window.location.href = "./Homepage.html";
        return null;
    }
}
/* ------------- State Check ------------- */
let newLogin;
window.addEventListener("DOMContentLoaded", () => {
    newLogin = new Login();
});
//# sourceMappingURL=login.js.map