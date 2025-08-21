interface AccountProcesses {
    credentialManager: Object;
    apiHandler: Object;
    lightStreamer: Object;
    credentials: {
        [key: string]: string;
    };
    statsElements: {
        [key: string]: any;
    };
    subscribeToAccountStats: () => undefined;
    displayAccountStats: (dataObject: any) => undefined;
}
declare class AccountHandler implements AccountProcesses {
    credentialManager: CredentialManager;
    apiHandler: APIHandler;
    lightStreamer: LightstreamerHandler;
    credentials: {
        [key: string]: string;
    };
    statsElements: {
        [key: string]: HTMLElement | null;
    };
    constructor();
    initializeStatsElements(): {
        [key: string]: HTMLElement | null;
    };
    checkElement(elementId: string): HTMLElement | null;
    subscribeToAccountStats(): undefined;
    displayAccountStats(dataObject: any): undefined;
}
//# sourceMappingURL=account.d.ts.map