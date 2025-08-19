"use strict";
/* ----------- interfaces ------------*/
/* ----------- implementations ------------ */
class LightstreamerHandler {
    cookieHandler;
    constructor() {
        this.cookieHandler = new CookieHandler();
    }
    getCredentials() {
        let username = this.cookieHandler.searchForCookie("Username");
        let session = this.cookieHandler.searchForCookie("Session");
        if (!username) {
            window.location.href = "../pages/Login.html";
        }
        if (!session) {
            console.log("Implement something to automatically grab and set the sessionID");
        }
        let credentials = { "Username": username, "Session": session };
        return credentials;
    }
    createClient(url, adapterSet) {
        let credentials = this.getCredentials();
        let client = new LightstreamerClient(url, adapterSet);
        client.connectionDetails.setUser(credentials.Username);
        client.connectionDetails.setPassword(credentials.Session);
        client.connect();
        return client;
    }
    createSubscription(type, items, fields, dataAdapter) {
        let subscription = new Subscription(type, items, fields);
        subscription.setDataAdapter(dataAdapter);
        subscription.setRequestedSnapshot("yes");
        return subscription;
    }
    createSubscriptionListener(logic = () => { return null; }) {
        return { "onItemUpdate": logic };
    }
}
/* ------------- State Check ------------- */
//Used for testing connections
// let lightstreamer: LightstreamerHandler;
// window.addEventListener("DOMContentLoaded", () => {
//     lightstreamer = new LightstreamerHandler()
// })
//# sourceMappingURL=lightstreamer.js.map