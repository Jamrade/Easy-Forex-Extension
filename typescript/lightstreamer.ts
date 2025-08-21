/* ----------- interfaces ------------*/

interface LightstreamerOperations {

    credentialManager: Object;

    credentials: {[key: string]: string};

    createClient: (url: string, adapterSet: string) => string;

    createSubscription: (type: string, items: Array<string>, fields: Array<string>, dataAdapter: string) => any;

    createSubscriptionListener: (logic: () => any) => {[key: string]: (dataObject: {[key: string]: string}) => undefined};

}

/* ----------- implementations ------------ */



class LightstreamerHandler implements LightstreamerOperations {

    credentialManager: CredentialManager;

    credentials: {[key: string]: string}

    constructor() {
        this.credentialManager = new CredentialManager()
        this.credentials = this.credentialManager.getCredentials()
    }

    createClient(url: string, adapterSet: string): string {

        let client = new LightstreamerClient(url, adapterSet);
        client.connectionDetails.setUser(this.credentials.Username);
        client.connectionDetails.setPassword(this.credentials.Session);
        
        client.connect()
        
        return client

    }

    createSubscription(type: string, items: Array<string>, fields: Array<string>, dataAdapter: string): any {
        let subscription = new Subscription(type, items, fields);

        subscription.setDataAdapter(dataAdapter);
        subscription.setRequestedSnapshot("yes");

        return subscription;
    }

    createSubscriptionListener(logic: (dataObject: any) => any = () => {return null}): {[key: string]: (data: {[key: string]: string}) => undefined} {
        return {"onItemUpdate": logic}
    }

}

/* ------------- State Check ------------- */

//Used for testing connections

// let lightstreamer: LightstreamerHandler;

// window.addEventListener("DOMContentLoaded", () => {
//     lightstreamer = new LightstreamerHandler()

// })