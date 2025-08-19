"use strict";
/* ----------- interfaces ------------*/
/* ----------- implementations ------------ */
class Login {
    cookieManager;
    apiHandler;
    username;
    constructor() {
        this.cookieManager = new CookieHandler();
        this.apiHandler = new APIHandler();
        this.username = "";
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
        this.username = credentials["username"];
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
        this.cookieManager.createSessionCookie("Username", this.username);
        this.cookieManager.createSessionCookie("Session", response.session);
        this.requestAccountId(response.session, this.username);
        //this.navigateToHomepage()
        return null;
    }
    requestAuthorization() {
        let credentials = this.getCredentials();
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
            "Content-type": "application/json"
        };
        this.apiHandler.sendRequest(url, method, header, body, this.saveSessionInfo.bind(this), this.displayError);
        return null;
    }
    displayError(errorMessage) {
        console.log(errorMessage);
        return null;
    }
    requestAccountId(sessionToken, username) {
        const url = "https://ciapi.cityindex.com/v2/userAccount/ClientAndTradingAccount";
        const method = "GET";
        const headers = {
            "content-type": "application/json",
            "UserName": username,
            "Session": sessionToken
        };
        const body = {};
        this.apiHandler.sendRequest(url, method, headers, body, this.saveAccountId.bind(this), this.displayError);
        return null;
    }
    saveAccountId(response) {
        this.cookieManager.createSessionCookie("accountId", response.clientAccounts[0].clientAccountId);
        this.navigateToHomepage();
        return null;
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