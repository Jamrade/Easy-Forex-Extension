interface CookieManipulation {
    createSessionCookie: (cookieLabel: string, cookieValue: string) => null;
    searchForCookie: (cookieLabel: string) => string;
}
declare class CookieHandler implements CookieManipulation {
    createSessionCookie(cookieLabel: string, cookieValue: string): null;
    searchForCookie(cookieLabel: string): string;
}
//# sourceMappingURL=cookies.d.ts.map