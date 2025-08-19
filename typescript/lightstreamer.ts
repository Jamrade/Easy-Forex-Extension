/* ----------- interfaces ------------*/

interface LightstreamerOperations {

    cookieHandler: CookieHandler;

    getCredentials: () => {[key: string]: string}

    createClient: (url: string, adapterSet: string) => string;

    createSubscription: (type: string, items: Array<string>, fields: Array<string>, dataAdapter: string) => any;

    createSubscriptionListener: (logic: () => any) => {[key: string]: (dataObject: {[key: string]: string}) => undefined};

}

/* ----------- implementations ------------ */



class LightstreamerHandler implements LightstreamerOperations {

    cookieHandler: CookieHandler

    constructor() {
        this.cookieHandler = new CookieHandler();
    }

    getCredentials(): {[key: string]: string} {

        let username: string = this.cookieHandler.searchForCookie("Username")
        let session: string = this.cookieHandler.searchForCookie("Session")

        if(!username) {
            window.location.href = "../pages/Login.html"
        }
        if(!session) {
            console.log("Implement something to automatically grab and set the sessionID")
        }

        let credentials: {[key: string]: string} = {"Username": username, "Session": session}

        return credentials

    }

    createClient(url: string, adapterSet: string): string {

        let credentials: {[key: string]: string} = this.getCredentials()

        let client = new LightstreamerClient(url, adapterSet);
        client.connectionDetails.setUser(credentials.Username);
        client.connectionDetails.setPassword(credentials.Session);
        
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