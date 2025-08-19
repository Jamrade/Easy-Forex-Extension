interface AccountProcesses {
    cookieHandler: Object;
    apiHandler: Object;
    lightStreamer: Object;
    accountId: string;
    statsElements: {
        [key: string]: any;
    };
    getAccountId: () => string;
    subscribeToAccountStats: () => undefined;
    displayAccountStats: (dataObject: any) => undefined;
}
declare class AccountHandler implements AccountProcesses {
    cookieHandler: CookieHandler;
    apiHandler: APIHandler;
    lightStreamer: LightstreamerHandler;
    accountId: string;
    statsElements: {
        [key: string]: HTMLElement | null;
    };
    constructor();
    getAccountId(): string;
    initializeStatsElements(): {
        [key: string]: HTMLElement | null;
    };
    checkElement(elementId: string): HTMLElement | null;
    subscribeToAccountStats(): undefined;
    displayAccountStats(dataObject: any): undefined;
}
//# sourceMappingURL=account.d.ts.map