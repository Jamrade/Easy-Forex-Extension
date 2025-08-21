"use strict";
/* ----------- interfaces ------------*/
/* ----------- implementations ------------ */
class LightstreamerHandler {
    credentialManager;
    credentials;
    constructor() {
        this.credentialManager = new CredentialManager();
        this.credentials = this.credentialManager.getCredentials();
    }
    createClient(url, adapterSet) {
        let client = new LightstreamerClient(url, adapterSet);
        client.connectionDetails.setUser(this.credentials.Username);
        client.connectionDetails.setPassword(this.credentials.Session);
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