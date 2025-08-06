/* ----------- interfaces ------------*/

import { ReturnStatement } from "../node_modules/typescript/lib/typescript";

interface Access {

    cookieManager: Object

    apiHandler: Object;

    getCredentials(): {[key: string]: string};

    inputValidator(valuesToTest: Array<string>): boolean;

    saveSessionInfo(response: object): null;

    requestAuthorization(): null;

    displayError(errorMessage: string): null;

}

/* ----------- implementations ------------ */

class Login implements Access{
    
    cookieManager;

    apiHandler;

    constructor() {
        this.apiHandler = new APIHandler()
        this.cookieManager = {}
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

    saveSessionInfo(response: object): null {
        // session manager call here

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
            "content-type": "application/json"
        }

        this.apiHandler.sendRequest(url, method, header, body, this.saveSessionInfo, this.displayError)

        return null;
    }

    displayError(errorMessage: string): null {
        return null;
    }

    getAccountId(sessionToken: string, username: string): string {
        return "";
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