/* ----------- interfaces ------------*/

interface CredentialOperations {

    cookieHandler: Object;

    getCredentials: () => {[key: string]: string};

}

/* ----------- implementations ------------ */

class CredentialManager implements CredentialOperations {

    cookieHandler: CookieHandler;

    constructor() {
        this.cookieHandler = new CookieHandler()
    }

    getCredentials(): {[key:string]: string} {

        let credentialTags: Array<string> = ["Username", "Session", "accountId"]

        let credentials: {[key: string]: string} = {}

        for (let index in credentialTags) {
            let key: string = credentialTags[index]
            let value: string = this.cookieHandler.searchForCookie(key)

            if (value === "") {
                window.location.href = "../pages/Login.html"
            }

            credentials[key] = value
        }

        return credentials
    }

}   

/* ------------- State Check ------------- */
window.addEventListener("DOMContentLoaded", () => {
    let credentials: CredentialManager = new CredentialManager

    console.log(credentials.getCredentials())
})