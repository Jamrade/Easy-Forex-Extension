interface CredentialOperations {
    cookieHandler: Object;
    getCredentials: () => {
        [key: string]: string;
    };
}
declare class CredentialManager implements CredentialOperations {
    cookieHandler: CookieHandler;
    constructor();
    getCredentials(): {
        [key: string]: string;
    };
}
//# sourceMappingURL=credentials.d.ts.map