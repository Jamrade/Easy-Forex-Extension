interface Access {
    cookieManager: Object;
    apiHandler: Object;
    username: string;
    getCredentials(): {
        [key: string]: string;
    };
    inputValidator(valuesToTest: Array<string>): boolean;
    saveSessionInfo(response: object): null;
    requestAuthorization(): null;
    displayError(errorMessage: string): null;
}
declare class Login implements Access {
    cookieManager: CookieHandler;
    apiHandler: APIHandler;
    username: string;
    constructor();
    getCredentials(): {
        [key: string]: string;
    };
    inputValidator(valuesToTest: Array<string>): boolean;
    saveSessionInfo(response: {
        [key: string]: string;
    }): null;
    requestAuthorization(): null;
    displayError(errorMessage: string): null;
    requestAccountId(sessionToken: string, username: string): null;
    saveAccountId(response: {
        [key: string]: any;
    }): null;
    navigateToHomepage(): null;
}
declare let newLogin: any;
//# sourceMappingURL=login.d.ts.map