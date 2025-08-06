interface Access {
    cookieManager: Object;
    apiHandler: Object;
    getCredentials(): Object;
    inputValidator(valuesToTest: Array<string>): boolean;
    saveSessionInfo(response: object): null;
    requestAuthorization(): null;
    displayError(errorMessage: string): null;
}
declare class Login implements Access {
    cookieManager: {};
    apiHandler: APIHandler;
    constructor();
    getCredentials(): object;
    inputValidator(valuesToTest: Array<string>): boolean;
    saveSessionInfo(response: object): null;
    requestAuthorization(): null;
    displayError(errorMessage: string): null;
    getAccountId(sessionToken: string, username: string): string;
    navigateToHomepage(): null;
}
declare let newLogin: any;
//# sourceMappingURL=login.d.ts.map