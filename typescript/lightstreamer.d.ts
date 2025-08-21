interface LightstreamerOperations {
    credentialManager: Object;
    credentials: {
        [key: string]: string;
    };
    createClient: (url: string, adapterSet: string) => string;
    createSubscription: (type: string, items: Array<string>, fields: Array<string>, dataAdapter: string) => any;
    createSubscriptionListener: (logic: () => any) => {
        [key: string]: (dataObject: {
            [key: string]: string;
        }) => undefined;
    };
}
declare class LightstreamerHandler implements LightstreamerOperations {
    credentialManager: CredentialManager;
    credentials: {
        [key: string]: string;
    };
    constructor();
    createClient(url: string, adapterSet: string): string;
    createSubscription(type: string, items: Array<string>, fields: Array<string>, dataAdapter: string): any;
    createSubscriptionListener(logic?: (dataObject: any) => any): {
        [key: string]: (data: {
            [key: string]: string;
        }) => undefined;
    };
}
//# sourceMappingURL=lightstreamer.d.ts.map