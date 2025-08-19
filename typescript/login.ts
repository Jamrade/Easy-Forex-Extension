/* ----------- interfaces ------------*/

interface Access {

    cookieManager: Object;

    apiHandler: Object;

    username: string;

    getCredentials(): {[key: string]: string};

    inputValidator(valuesToTest: Array<string>): boolean;

    saveSessionInfo(response: object): null;

    requestAuthorization(): null;

    displayError(errorMessage: string): null;

}

/* ----------- implementations ------------ */

class Login implements Access{
    
    cookieManager: CookieHandler;

    apiHandler: APIHandler;

    username: string;

    constructor() {
        this.cookieManager = new CookieHandler();
        this.apiHandler = new APIHandler();
        this.username = "";
    }

    getCredentials(): {[key: string]: string} {

        const credentials: {[key: string]: string} = {};
        
        const username: string = (document.getElementById("username") as HTMLInputElement)!.value;
        const password: string = (document.getElementById("password") as HTMLInputElement)!.value;
        const appKey: string = (document.getElementById("appKey") as HTMLInputElement)!.value;

        if (this.inputValidator([username, password, appKey])) {
            credentials["username"] = username;
            credentials["password"] = password;
            credentials["appKey"] = appKey;
        }

        this.username = credentials["username"];

        return credentials
    }

    inputValidator(valuesToTest: Array<string>): boolean {
        for(let index in valuesToTest) {
            let value = valuesToTest[index];

            if (value.length == 0) {
                console.log("Implement Error Message");
                throw Error("One or more inputs are empty");
            } else if (value.length > 64) {
                console.log("Implement Error Message");
                throw Error("One or more inputs are too long");
            }
        }

        return true;
    }

    saveSessionInfo(response: {[key: string]: string}): null {

        this.cookieManager.createSessionCookie("Username", this.username);
        this.cookieManager.createSessionCookie("Session", response.session);

        this.requestAccountId(response.session, this.username)

        //this.navigateToHomepage()

        return null;
    }

    requestAuthorization(): null {

        let credentials: {[key: string]: string} = this.getCredentials()

        const url: string = "https://ciapi.cityindex.com/v2/Session"

        const method: string =  "POST"

        const body: {[key: string]: string} = {
            "Password": credentials.password,
            "AppVersion": "1",
            "AppComments": "",
            "UserName": credentials.username,
            "AppKey": credentials.appKey
        }

        const header: {[key: string]: string} = {
            "Content-type": "application/json"
        }

        this.apiHandler.sendRequest(url, method, header, body, this.saveSessionInfo.bind(this), this.displayError)

        return null;
    }

    displayError(errorMessage: string): null {
        console.log(errorMessage)
        return null;
    }

    requestAccountId(sessionToken: string, username: string): null {

        const url: string = "https://ciapi.cityindex.com/v2/userAccount/ClientAndTradingAccount"

        const method: string = "GET"

        const headers: {[key: string]: string} = {
            "content-type":"application/json",
            "UserName":username,
            "Session": sessionToken
        }

        const body: {} = {}

        this.apiHandler.sendRequest(url, method, headers, body, this.saveAccountId.bind(this), this.displayError)

        return null;
    }

    saveAccountId(response: {[key: string]: any}): null {
        this.cookieManager.createSessionCookie("accountId", response.clientAccounts[0].clientAccountId)

        this.navigateToHomepage()

        return null;
    }

    navigateToHomepage(): null {
        window.location.href = "./Homepage.html";

        return null;
    }
}

/* ------------- State Check ------------- */

let newLogin;

window.addEventListener("DOMContentLoaded", () => {
    newLogin = new Login()
})